'use client';
import { IBand, IVote } from '@domain/content';
import { useParams } from 'next/navigation';

import React, { createContext, useMemo } from 'react';

interface IUserDataInput {
  userInfo: any;
  userBands?: IBand[];
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
}): React.ReactNode {
  const params = useParams();

  const ctx = {
    ...userProfile,
  };

  return <UserContext.Provider value={ctx}>{children}</UserContext.Provider>;
}
