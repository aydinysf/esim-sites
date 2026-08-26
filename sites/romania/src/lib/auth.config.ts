import type { NextAuthConfig } from "next-auth";

// Edge Runtime'da çalışan minimal config — Prisma yok
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isLoginPage = nextUrl.pathname === "/admin/login";
      if (isLoginPage) return true;
      return isLoggedIn;
    },
  },
};
