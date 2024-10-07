import { serverConfig } from './index';
import {
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { fireAuth } from '../firebase/firebaseClient';
import { getTokens } from 'next-firebase-auth-edge';
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { FirebaseError } from 'firebase/app';

function resolveAuthError(code: string) {
  switch (code) {
    case 'auth/quota-exceeded':
      return 'timeout, please try a different login method...';

    case 'auth/admin-restricted-operation':
      return 'unknown email, please try a known email';

    case 'auth/invalid-credential':
      return 'incorrect credentials';

    default:
      return code;
  }
}

export async function sendEmailLinkForSignIn(email: string) {
  return await sendSignInLinkToEmail(fireAuth, email, {
    url: process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://votinglist.pettico.de',
    handleCodeInApp: true,
  });
}

export async function passwordSignIn(email: string, password: string) {
  try {
    const response = await signInWithEmailAndPassword(fireAuth, email, password);
    // const userToken = await response.user.getIdToken();
    return response;
  } catch (error) {
    console.error(error);
    const message = resolveAuthError((error as FirebaseError).code);
    throw new Error(message);
  }
}

export async function sendPasswordResetLink(email: string) {
  try {
    await sendPasswordResetEmail(fireAuth, email);
  } catch (error) {
    console.error(error);
    const message = resolveAuthError((error as FirebaseError).code);
    throw new Error(message);
  }
}

export async function getAuthSession(cookies: ReadonlyRequestCookies) {
  const tokens = await getTokens(cookies, {
    apiKey: serverConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });

  return tokens?.decodedToken;
}

export async function signOut() {
  try {
    await firebaseSignOut(fireAuth);
  } catch (error) {}
}
