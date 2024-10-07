import NextAuth from 'next-auth';

import { authOptions } from '@/utils/authentication/authOptions';

/** Route Handler for Authentication
 * https://nextjs.org/docs/app/api-reference/file-conventions/route
 *
 * https://next-auth.js.org/configuration/initialization#route-handlers-app
 */

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
