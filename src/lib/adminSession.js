import "server-only";
import { auth } from "@/auth";
import { findActiveAdminById } from "@/lib/admins";

export async function getAuthenticatedAdmin() {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== "admin") {
    return null;
  }

  return findActiveAdminById(session.user.id);
}
