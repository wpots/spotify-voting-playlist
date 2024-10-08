'use client';

import { onAuthStateChanged } from 'firebase/auth';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { fireAuth } from '../firebaseClient.client';
import { firebaseClientConfig } from '../firebase.config';

interface AuthContext {
  [key: string]: unknown;
}

export const AuthContext = createContext<AuthContext | undefined>(undefined);

export default function FirebaseContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>();
  console.log('USER', user);
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
    const unsubscribe = onAuthStateChanged(fireAuth, authUser => {
      console.log('CHANGE', user);
      setUser(authUser);
    });
    return () => unsubscribe();
  }, []);

  const ctx = {
    user,
  };

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
}
