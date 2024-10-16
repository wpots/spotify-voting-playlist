'use client';

import { onAuthStateChanged, User } from 'firebase/auth';
import { createContext, ReactNode, useEffect, useState } from 'react';

import { fireAuth } from '../firebaseClient.client';
import { firebaseCollectionConfig as firebaseConfig } from '../firebase.config';
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
    if ('serviceWorker' in navigator && firebaseConfig) {
      try {
        const serializedConfig = encodeURIComponent(JSON.stringify(firebaseConfig));
        const serviceWorkerUrl = `/auth-service-worker.js?firebaseConfig=${serializedConfig}`;

        navigator.serviceWorker.register(serviceWorkerUrl).then(registration => {
          if (registration?.active) {
            registration.active.onerror = event => {
              console.log('ERROR CTX on SW', event);
            };
          }
        });
      } catch (error) {
        console.log('ERROR CTX', error);
      }
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(fireAuth, async authUser => {
      setUser(authUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (user && pathName === '/signin') router.push('/');
    router.refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
}
