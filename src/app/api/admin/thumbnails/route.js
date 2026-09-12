import { getAuthenticatedAdmin } from "@/lib/adminSession";
import { uploadThumbnail } from "@/lib/cloudinary";
import { validateThumbnailFile } from "@/lib/thumbnailValidation";

export const runtime = "nodejs";

function isSameOrigin(request) {
  const origin = request.headers.get("origin");
  return origin === new URL(request.url).origin;
}

export async function POST(request) {
  const admin = await getAuthenticatedAdmin();

  if (!admin) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  if (!isSameOrigin(request)) {
    return Response.json({ error: "Invalid request origin." }, { status: 403 });
  }

  let formData;

  try {
    formData = await request.formData();
  } catch {
    return Response.json(
      {
        error:
          "The upload request is invalid. Select a JPG, JPEG, PNG, or WebP image up to 10 MB.",
      },
      { status: 400 },
    );
  }

  const file = formData.get("file");
  const validation = validateThumbnailFile(file);

  if (!validation.valid) {
    return Response.json(
      { error: validation.message, code: validation.code },
      { status: 400 },
    );
  }

  try {
    const thumbnail = await uploadThumbnail(file);
    return Response.json({ thumbnail }, { status: 201 });
  } catch (error) {
    console.error("Cloudinary thumbnail upload failed:", error.message);
    return Response.json(
      {
        error:
          "The thumbnail could not be uploaded. Check the image and try again.",
      },
      { status: 502 },
    );
  }
}
