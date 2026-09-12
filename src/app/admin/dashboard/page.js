import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { findActiveAdminById } from "@/lib/admins";
import { listMedia } from "@/lib/mediaRepository";
import MediaDashboard from "./MediaDashboard";

export const metadata = {
  title: "Admin Dashboard",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminDashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/admin");
  }

  const admin = await findActiveAdminById(session.user.id);

  if (!admin) {
    await signOut({ redirectTo: "/admin" });
  }

  const initialMedia = await listMedia("active");

  return (
    <main className="min-h-screen px-5 py-16 md:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-5 border-b border-zinc-800 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              className="text-sm font-medium text-sky-400 transition hover:text-sky-300"
              href="/"
            >
              DualMode Studio
            </Link>
            <h1 className="mt-2 font-syne text-3xl font-semibold md:text-4xl">
              Video management
            </h1>
            <p className="mt-2 text-zinc-400">Signed in as {admin.email}</p>
          </div>

          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin" });
            }}
          >
            <button
              className="rounded-xl border border-zinc-700 px-5 py-2.5 font-medium text-zinc-200 transition hover:border-zinc-500 hover:text-white"
              type="submit"
            >
              Sign out
            </button>
          </form>
        </header>

        <MediaDashboard initialMedia={initialMedia} />
      </div>
    </main>
  );
}
