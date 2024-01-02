import NextAuth, { AuthOptions, SessionStrategy } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import FireStoreService from "@/utils/firebase/firebase.service";
import { JWT } from "next-auth/jwt";
import { getRefreshToken } from "@/utils/authentication/spotify.provider";

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
      authorization: {
        url: `https://accounts.spotify.com/authorize`,
        params: {
          scope: `user-read-email`,
        },
      },
      async profile(profile) {
        const verifiedUser = await FireStoreService.getVerifiedUser(profile.id);
        const userProfile = {
          id: profile.id,
          name: profile.display_name,
          email: profile.email,
          image: profile.images?.[0]?.url,
        };
        if (verifiedUser) {
          // update users profile info to match spotify
          await FireStoreService.setUserProfile(userProfile);
        }
        return userProfile;
      },
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
    async signIn() {
      return "/";
    },
    async jwt({ account, user, token }) {
      token.error = null;
      if (account && user) {
        token.accessToken = account.access_token;
        token.accessTokenExpires = Date.now() + account.expires_in * 1000;
        token.refreshToken = account.refresh_token;
      }

      if (Date.now() > token.accessTokenExpires) {
        token = await getRefreshToken(token);
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.token = token.accessToken;
        session.error = token.error;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
