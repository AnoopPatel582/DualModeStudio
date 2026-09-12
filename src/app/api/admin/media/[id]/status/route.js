import { getAuthenticatedAdmin } from "@/lib/adminSession";
import { setMediaStatus } from "@/lib/mediaRepository";
import { parseMediaStatusChange } from "@/lib/mediaSchema";

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

  const validation = parseMediaStatusChange(requestBody);

  if (!validation.success) {
    return Response.json({ error: "Invalid project status." }, { status: 400 });
  }

  const { id } = await params;
  const media = await setMediaStatus(
    id,
    validation.data.status,
    admin._id.toString(),
  );

  if (!media) {
    return Response.json({ error: "Project not found." }, { status: 404 });
  }

  return Response.json({ media });
}
