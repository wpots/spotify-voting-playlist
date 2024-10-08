import {
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { fireAuth } from '../firebaseClient.client';
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

export async function signOut() {
  try {
    await firebaseSignOut(fireAuth);
  } catch (error) {}
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
    const userToken = await response.user.getIdToken();
    return userToken;
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
