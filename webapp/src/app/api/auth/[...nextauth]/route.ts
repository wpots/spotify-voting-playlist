import NextAuth, { AuthOptions, SessionStrategy } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { isVerifiedUser } from "./verifyUser.service";

/** Route Handler for Authentication
 * https://nextjs.org/docs/app/api-reference/file-conventions/route
 *
 * https://next-auth.js.org/configuration/initialization#route-handlers-app
 */
export const authOptions: AuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  pages: {
    signIn: "/auth/signin",
  },
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    // @ts-ignore
    async signIn(payload) {
      console.log("signin", payload);

      //   if (account?.provider === "google" && profile?.email) {
      //     try {
      //       return await isVerifiedUser(profile.email);
      //     } catch (error) {
      //       console.log(error);
      //       return false;
      //     }
      //   }
      //   return false;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
