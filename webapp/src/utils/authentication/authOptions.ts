import { AuthOptions, SessionStrategy } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

import { providerOptions, getRefreshToken } from "@/utils/authentication/spotify.provider";

/** Route Handler for Authentication
 * https://nextjs.org/docs/app/api-reference/file-conventions/route
 *
 * https://next-auth.js.org/configuration/initialization#route-handlers-app
 */

const authOptions: AuthOptions = {
  providers: [SpotifyProvider(providerOptions)],
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
      return true;
    },
    async jwt({ account, user, token, profile }) {
      token.error = null;
      if (account && user) {
        token.id = user.id;
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
        session.user.id = token.id;
        session.token = token.accessToken;
        session.error = token.error;
      }

      return session;
    },
  },
};

export { authOptions };
