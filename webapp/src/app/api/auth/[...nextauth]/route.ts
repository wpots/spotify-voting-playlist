import NextAuth, { AuthOptions, SessionStrategy } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import FireStoreService from "@/utils/firebase/firebase.service";

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
        const fireStoreProfile = await FireStoreService.isVerifiedUser(profile.id);
        console.log("p", fireStoreProfile);
        return { ...profile, memberships: fireStoreProfile?.memberships };
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
      if (user?.memberships) token.memberships = user.memberships;
      if (account?.access_token) token.accessToken = account.access_token;
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.memberships = token?.memberships;
        session.token = token.accessToken;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
