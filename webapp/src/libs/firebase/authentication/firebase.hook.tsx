'use client';

import { useContext, useEffect } from 'react';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { fireAuth } from '@/libs/firebase/firebaseClient.client';
import { AuthService, AuthContext } from '.';
import { useParams, useRouter } from 'next/navigation';

const EMAIL_IN_STORAGE = 'emailSignIn';

export type FormState = {
  status: 'IDLE' | 'OK' | 'ERROR';
  data?: Record<string, string>;
  success?: string;
  error?: string;
};

export function useFirebaseAuthentication() {
  const router = useRouter();
  const params = useParams();

  async function sendLinkSignInAction(_: FormState, formData: FormData): Promise<FormState> {
    const email = formData.get('email') as string;

    try {
      await AuthService.sendEmailLinkForSignIn(email);
      window.localStorage.setItem(EMAIL_IN_STORAGE, email);

      return { status: 'OK', data: { email } };
    } catch (error) {
      return { status: 'ERROR', error: error as string };
    }
  }

  async function passwordResetAction(state: FormState, formData: FormData): Promise<FormState> {
    const email = formData.get('email') as string;
    try {
      await AuthService.sendPasswordResetLink(email);
      return { status: 'OK', data: { email } };
    } catch (error) {
      return { status: 'ERROR', error: error as string };
    }
  }

  async function passwordSignInAction(_: FormState, formData: FormData): Promise<FormState> {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    // do zod stuff
    try {
      const userToken = await AuthService.passwordSignIn(email, password);

      router.replace((params?.returnTo as string) || '/');
      return { status: 'OK', data: { userToken } };
    } catch (error) {
      return { status: 'ERROR', error: error as string };
    }
  }

  async function signOut() {
    await AuthService.signOut();
  }

  useEffect(() => {
    const signInLink = window?.location.href;

    if (isSignInWithEmailLink(fireAuth, signInLink)) {
      let email = window.localStorage.getItem(EMAIL_IN_STORAGE);

      if (!email) email = window?.prompt('vul je email adres in.');

      async function completeSignIn() {
        try {
          const response = await signInWithEmailLink(fireAuth, email!, signInLink);
          const userToken = await response.user.getIdToken();

          window.localStorage.removeItem(EMAIL_IN_STORAGE);

          // You can access the new user by importing getAdditionalUserInfo
          // and calling it with result:
          // getAdditionalUserInfo(result)
          // You can access the user's profile via:
          // getAdditionalUserInfo(result)?.profile
          // You can check if the user is new or existing:
          // getAdditionalUserInfo(result)?.isNewUser
        } catch (error) {
          // error.code error.message
        }
      }

      completeSignIn();
    }
  }, []);

  const auth = useContext(AuthContext);

  return {
    sendLinkSignInAction,
    passwordResetAction,
    passwordSignInAction,
    signOut,
    auth,
  };
}
