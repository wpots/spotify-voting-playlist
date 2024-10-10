import { authMiddleware, getTokens } from 'next-firebase-auth-edge';
import { firebaseAuthClient } from '@/libs/firebase/firebaseClient.server';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { middlewareConfig, tokenSettings } from '@/libs/firebase/firebase.server.config';
import { NextRequest } from 'next/server';
import { headers, cookies } from 'next/headers';

async function getAuthServerSession(headers: Headers) {
  const authToken = headers.get('Authorization')?.split(' ')[1];
  if (!authToken) return;
  return await firebaseAuthClient(authToken);
}

async function getAuthSession() {
  const requestHeaders = headers();
  const requestCookies = cookies();
  const authToken = requestHeaders.get('Authorization')?.split(' ')[1];

  const authCookie = await getTokens(requestCookies, tokenSettings);
  const fireAuth = await firebaseAuthClient(authToken);
  const currentUser = authCookie?.decodedToken || fireAuth?.currentUser;
  const session = {
    ...(authCookie && { authCookie }),
    ...(fireAuth && { fireAuth }),
    currentUser,
  };
  return session;
}

async function withAuthMiddleware(request: NextRequest) {
  const authToken = request.headers.get('authorization');
  const authCookie = request.cookies.get(middlewareConfig.cookieName);
  if (authToken && !authCookie) {
  }
  return authMiddleware(request, { loginPath: '/api/login', logoutPath: '/api/logout', ...middlewareConfig });
}

export { withAuthMiddleware, getAuthServerSession, getAuthSession };
