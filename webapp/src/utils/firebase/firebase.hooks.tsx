'use client';

import { useEffect } from 'react';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { fireAuth } from '@/utils/firebase/firebaseClient';

type AuthenticationProps = {
  email?: string;
};

const EMAIL_IN_STORAGE = 'emailSignIn';

export function useAuthentication(props?: AuthenticationProps) {
  useEffect(() => {
    const signInLink = window?.location.href;

    if (isSignInWithEmailLink(fireAuth, signInLink)) {
      let email = window.localStorage.getItem(EMAIL_IN_STORAGE);

      if (!email) email = window?.prompt('please fill in your email');

      async function completeSignIn() {
        try {
          const response = await signInWithEmailLink(fireAuth, email!, signInLink);
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

  useEffect(() => {
    if (props?.email) {
      window.localStorage.setItem(EMAIL_IN_STORAGE, props.email);
    }
  }, [props]);

  return {
    hello: true,
  };
}
