import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: User;
    token?: string;
  }
  interface User {
    memberships?: string[];
    name?: string;
  }
}
