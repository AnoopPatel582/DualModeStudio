import Image from "next/image";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Admin Login",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/admin/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-16">
      <section className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900/60 p-7 shadow-2xl shadow-sky-950/20 backdrop-blur md:p-9">
        <Image
          alt="DualMode Studio"
          className="h-auto w-64 max-w-full"
          height={100}
          priority
          src="/logo_title.png"
          width={500}
        />
        <h1 className="mt-8 font-syne text-3xl font-semibold">Admin login</h1>
        <p className="mt-2 text-zinc-400">
          Sign in with an authorized administrator account.
        </p>
        <LoginForm />
      </section>
    </main>
  );
}
