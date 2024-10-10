'use client';

import { onAuthStateChanged, User } from 'firebase/auth';
import { createContext, ReactNode, useEffect, useState, useContext } from 'react';
import { fireAuth } from '../firebaseClient.client';
import { firebaseClientConfig } from '../firebase.config';
import { useRouter } from 'next/navigation';

interface AuthContext {
  user: User;
  loading: boolean;
}

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
      setUser(authUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    router.refresh();
  }, [user, router]);

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
}
