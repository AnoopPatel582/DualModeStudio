import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authenticateAdmin } from "@/lib/admins";
import {
  clearFailedAdminLogins,
  getAdminLoginRateLimitStatus,
  recordFailedAdminLogin,
} from "@/lib/adminLoginRateLimit";

class AdminRateLimitedSignin extends CredentialsSignin {
  code = "rate_limited";
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/admin",
  },
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60,
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request) {
        const currentLimit = await getAdminLoginRateLimitStatus(
          credentials,
          request,
        );

        if (currentLimit.blocked) {
          throw new AdminRateLimitedSignin();
        }

        const admin = await authenticateAdmin(credentials);

        if (!admin) {
          const nextLimit = await recordFailedAdminLogin(credentials, request);

          if (nextLimit.blocked) {
            throw new AdminRateLimitedSignin();
          }

          return null;
        }

        await clearFailedAdminLogins(credentials, request);
        return admin;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.adminId = user.id;
        token.role = user.role;
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.adminId;
        session.user.role = token.role;
      }

      return session;
    },
  },
});
