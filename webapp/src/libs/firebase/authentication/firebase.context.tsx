'use client';

import { onAuthStateChanged, User } from 'firebase/auth';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { fireAuth } from '../firebaseClient.client';
import { firebaseClientConfig } from '../firebase.config';
import { usePathname, useRouter } from 'next/navigation';

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
  const pathName = usePathname();

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
      router.refresh();
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    console.log('user', user);
    router.refresh();
  }, [user, router]);

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
}
