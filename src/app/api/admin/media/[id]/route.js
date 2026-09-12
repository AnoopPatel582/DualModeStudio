import { getAuthenticatedAdmin } from "@/lib/adminSession";
import { deleteThumbnail } from "@/lib/cloudinary";
import {
  claimArchivedMediaForDeletion,
  deleteClaimedMedia,
  releaseMediaDeletionClaim,
  updateMedia,
} from "@/lib/mediaRepository";
import { parseCreateMedia } from "@/lib/mediaSchema";

function isSameOrigin(request) {
  const origin = request.headers.get("origin");
  return origin === new URL(request.url).origin;
}

export async function PATCH(request, { params }) {
  const admin = await getAuthenticatedAdmin();

  if (!admin) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  if (!isSameOrigin(request)) {
    return Response.json({ error: "Invalid request origin." }, { status: 403 });
  }

  let requestBody;

  try {
    requestBody = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const validation = parseCreateMedia(requestBody);

  if (!validation.success) {
    return Response.json(
      {
        error: "Invalid media details.",
        fields: validation.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const { id } = await params;
  const media = await updateMedia(
    id,
    validation.data,
    admin._id.toString(),
  );

  if (!media) {
    return Response.json(
      { error: "Active project not found." },
      { status: 404 },
    );
  }

  return Response.json({ media });
}

export async function DELETE(request, { params }) {
  const admin = await getAuthenticatedAdmin();

  if (!admin) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  if (!isSameOrigin(request)) {
    return Response.json({ error: "Invalid request origin." }, { status: 403 });
  }

  const { id } = await params;
  const claim = await claimArchivedMediaForDeletion(id);

  if (!claim) {
    return Response.json(
      { error: "Archived project not found or is already being deleted." },
      { status: 409 },
    );
  }

  try {
    if (claim.media.thumbnail?.publicId) {
      await deleteThumbnail(claim.media.thumbnail.publicId);
    }

    const deleted = await deleteClaimedMedia(id, claim.deletionToken);

    if (!deleted) {
      throw new Error("The database deletion could not be completed.");
    }

    return Response.json({ deleted: true, id });
  } catch (error) {
    await releaseMediaDeletionClaim(id, claim.deletionToken).catch(
      (releaseError) => {
        console.error(
          "Media deletion lock release failed:",
          releaseError.message,
        );
      },
    );
    console.error("Permanent media deletion failed:", error.message);

    return Response.json(
      {
        error:
          "The project could not be permanently deleted. It remains archived; please try again.",
      },
      { status: 502 },
    );
  }
}
