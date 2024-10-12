'use client';
import { IBand, IUserData } from '@domain/content';

import React, { createContext, PropsWithChildren } from 'react';

interface IUserContext {
  myBands?: Array<IBand>;
  isAdmin?: boolean;
}
export const UserContext = createContext<IUserContext | null>(null);

export default function UserContextProvider(props: PropsWithChildren<{ data: IUserData | null }>) {
  return <UserContext.Provider value={props.data}>{props.children}</UserContext.Provider>;
}
