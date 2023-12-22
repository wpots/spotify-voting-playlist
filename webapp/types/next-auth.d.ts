import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      memberships?: string[];
    };
    token?: string;
  }
  interface User {
    memberships?: string[];
  }
}
