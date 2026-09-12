import { getAuthenticatedAdmin } from "@/lib/adminSession";
import { createMedia, listMedia } from "@/lib/mediaRepository";
import { MEDIA_STATUSES, parseCreateMedia } from "@/lib/mediaSchema";

function isSameOrigin(request) {
  const origin = request.headers.get("origin");
  return origin === new URL(request.url).origin;
}

export async function GET(request) {
  const admin = await getAuthenticatedAdmin();

  if (!admin) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  const requestedStatus =
    new URL(request.url).searchParams.get("status") || "active";
  const allowedStatuses = [...MEDIA_STATUSES, "all"];

  if (!allowedStatuses.includes(requestedStatus)) {
    return Response.json({ error: "Invalid media status." }, { status: 400 });
  }

  const media = await listMedia(requestedStatus);
  return Response.json({ media });
}

export async function POST(request) {
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

  const media = await createMedia(validation.data, admin._id.toString());
  return Response.json({ media }, { status: 201 });
}
