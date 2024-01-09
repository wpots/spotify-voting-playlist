import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user?: User;
    token?: string;
    error?: string;
  }
  interface User {
    name?: string;
    id: string;
  }
}
