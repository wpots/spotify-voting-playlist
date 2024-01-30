import { AuthOptions, SessionStrategy } from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import { providerOptions, getRefreshToken } from '@/utils/authentication/spotify.provider';

/** Route Handler for Authentication
 * https://nextjs.org/docs/app/api-reference/file-conventions/route
 *
 * https://next-auth.js.org/configuration/initialization#route-handlers-app
 */

const authOptions: AuthOptions = {
  providers: [SpotifyProvider(providerOptions)],
  session: {
    strategy: 'jwt' as SessionStrategy,
  },
  pages: {
    signIn: '/auth/signin',
  },
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    // @ts-ignore
    async signIn() {
      return true;
    },
    async jwt({ account, user, token, profile }) {
      if (account && user) {
        console.log('expires_in', account.expires_in);
        token.id = user.id;
        token.accessToken = account.access_token;
        token.accessTokenExpires = Date.now() + (account.expires_in as number) * 1000;
        token.refreshToken = account.refresh_token;
      }

      const isExpired = token.accessTokenExpires && Date.now() > (token.accessTokenExpires as number);

      if (isExpired) {
        token = await getRefreshToken(token);
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.token = token.accessToken as string;
        session.error = token.error as string;
      }

      return session;
    },
  },
};

export { authOptions };
