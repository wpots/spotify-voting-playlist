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
          email: profile.email,
          image: profile.images?.[0]?.url,
          name: profile.display_name,
          memberships: verifiedUser?.memberships,
        };
        return await FireStoreService.setUserProfile(userProfile);
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
    async signIn({ user }) {
      const userHasMemberships = user?.memberships?.length && user?.memberships?.length > 0;

      return userHasMemberships || "/";
    },
    async jwt({ account, user, token }) {
      if (account && user) {
        token.memberships = user.memberships;
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
        session.user.memberships = token?.memberships;
        session.token = token.accessToken;
        session.error = token.error;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
