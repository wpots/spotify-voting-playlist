'use client';
import { IBand } from '@domain/content';

import React, { createContext } from 'react';

interface IUserDataInput {
  myBands?: IBand[];
  isAdmin?: boolean;
}
interface IUserContext extends IUserDataInput {
  currentBand?: IBand;
}
export const UserContext = createContext<IUserContext | undefined>(undefined); //TODO better typing

export default function UserContextProvider({
  children,
  userProfile,
}: {
  children: React.ReactNode;
  userProfile: IUserDataInput;
}) {
  const ctx = {
    ...userProfile,
  };

  return <UserContext.Provider value={ctx}>{children}</UserContext.Provider>;
}
