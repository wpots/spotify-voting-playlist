'use client';

import { onAuthStateChanged, User } from 'firebase/auth';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { fireAuth } from '../firebaseClient.client';
import { firebaseClientConfig } from '../firebase.config';
import { useRouter } from 'next/navigation';

interface AuthContext {
  user: User;
  loading: boolean;
}

const EMAIL_IN_STORAGE = 'emailSignIn';

export const AuthContext = createContext<AuthContext | null>(null);

export default function FirebaseContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const serializedConfig = encodeURIComponent(JSON.stringify(firebaseClientConfig));
      const serviceWorkerUrl = `/auth-service-worker.js?firebaseConfig=${serializedConfig}`;

      navigator.serviceWorker
        .register(serviceWorkerUrl)
        .then(registration => console.log('service scope is: ', registration.scope));
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(fireAuth, async authUser => {
      console.log('STATE CHANGE', authUser);
      setUser(authUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const signInLink = window?.location.href;
    console.log('HERE');
    if (isSignInWithEmailLink(fireAuth, signInLink)) {
      let email = window.localStorage.getItem(EMAIL_IN_STORAGE);
      console.log('THERE');
      if (!email) email = window?.prompt('vul je email adres in.');

      async function completeSignIn() {
        try {
          const response = await signInWithEmailLink(fireAuth, email!, signInLink);
          const userToken = await response.user.getIdToken();
          router.replace((params?.returnTo as string) || '/');
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
    router.refresh();
  }, [user, router]);

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
}
