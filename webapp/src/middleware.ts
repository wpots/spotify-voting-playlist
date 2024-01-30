import { withAuth } from 'next-auth/middleware';

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth(function middleware(req) {}, {
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    authorized: ({ req, token }) => {
      return true;
    },
  },
});
export const config = {
  matcher: ['/bands/:path*', '/members/:path*'],
};
