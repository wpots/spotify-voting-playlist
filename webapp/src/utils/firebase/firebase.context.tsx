'use client';

import { onAuthStateChanged } from 'firebase/auth';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { fireAuth } from './firebaseClient';

interface AuthContext {
  [key: string]: unknown;
}

export const AuthContext = createContext<AuthContext | undefined>(undefined);

export default function FirebaseContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>();
  console.log('USER CHANGE', user);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(fireAuth, authUser => {
      console.log('CONTEXT CHANGE', user);
      setUser(authUser);
    });
    return () => unsubscribe();
  }, []);

  const ctx = {
    user,
  };

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
}
