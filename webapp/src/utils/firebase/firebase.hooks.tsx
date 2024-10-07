'use client';

import { useCallback, useContext, useEffect } from 'react';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { fireAuth } from '@/utils/firebase/firebaseClient';
import { useRouter } from 'next/navigation';
import { AuthContext } from './firebase.context';

type AuthenticationProps = {
  status: string;
  data?: Record<string, string>;
};

const EMAIL_IN_STORAGE = 'emailSignIn';

export function useFirebaseAuthentication(props?: AuthenticationProps) {
  const router = useRouter();

  const login = useCallback(
    async (token?: string) => {
      const authToken = token || props?.data?.userToken;
      if (authToken) {
        await fetch('/api/login', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        router.push('/');
      }
    },
    [props?.data?.userToken]
  );

  const logout = async () => {
    await fetch('/api/logout');
    router.push('/signin');
  };

  useEffect(() => {
    const signInLink = window?.location.href;

    if (isSignInWithEmailLink(fireAuth, signInLink)) {
      let email = window.localStorage.getItem(EMAIL_IN_STORAGE);

      if (!email) email = window?.prompt('please fill in your email');

      async function completeSignIn() {
        try {
          const response = await signInWithEmailLink(fireAuth, email!, signInLink);
          window.localStorage.removeItem(EMAIL_IN_STORAGE);
          const userToken = await response.user.getIdToken();
          await login(userToken);
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
    if (props?.data?.email) {
      window.localStorage.setItem(EMAIL_IN_STORAGE, props.data.email);
    }
  }, [props?.data?.email]);

  useEffect(() => {
    async function completeSignIn() {
      await login();
    }
    if (props?.status === 'OK') completeSignIn();
  }, [props?.status]);

  const user = useContext(AuthContext);

  return {
    user,
    login,
    logout,
  };
}
