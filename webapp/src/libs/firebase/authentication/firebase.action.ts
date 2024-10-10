'use server';

import { cookies, headers } from 'next/headers';
import { middlewareConfig, tokenSettings } from '../firebase.server.config';
import { appendAuthCookies, setAuthCookies } from 'next-firebase-auth-edge/lib/next/cookies';

export async function setCookie() {
  const requestCookies = cookies();
  const requestHeaders = headers();
  const authToken = requestHeaders.get('Authorization')?.split(' ')[1];
  const cookieName = tokenSettings.cookieName;
  const hasAuthCookie = requestCookies.has(cookieName);
  console.log('TOKEN', authToken);
  if (!hasAuthCookie && authToken) {
    console.log('NOT SET YET');
    //   await setAuthCookies({ headers: headers() }, middlewareConfig);
  }
  if (hasAuthCookie && !authToken) {
    console.log('ON SIGN IN?');
    // requestCookies.delete(cookieName)
  }
}
