import { authMiddleware, getTokens } from 'next-firebase-auth-edge';
import { firebaseAuthClient } from '@/libs/firebase/firebaseClient.server';
import { middlewareConfig, tokenSettings } from '@/libs/firebase/firebase.server.config';
import { NextRequest, NextResponse } from 'next/server';
import { headers, cookies } from 'next/headers';

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
  const authToken = request.headers.get('authorization')?.split(`Bearer `)[1];
  const authCookie = request.cookies.get(middlewareConfig.cookieName);
  if (!authToken) NextResponse.redirect('/signin');

  if (authToken && !authCookie) {
  }
  return authMiddleware(request, { loginPath: '/api/login', logoutPath: '/api/logout', ...middlewareConfig });
}

export { withAuthMiddleware, getAuthSession };
