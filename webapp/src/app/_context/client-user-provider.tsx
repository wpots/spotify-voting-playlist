"use client";
import { IBand } from "@domain/band";
import { IVote } from "@domain/playlist";
import React, { createContext } from "react";

interface IUserContext {
  userInfo: any;
  userBands?: IBand[];
  currentBand?: IBand;
}
export const UserContext = createContext<IUserContext | undefined>(undefined); //TODO better typing

export default function UserContextProvider({
  children,
  userProfile,
}: {
  children: React.ReactNode;
  userProfile: {
    userInfo: any;
    userBands?: IBand[];
    currentBand: IBand;
  };
}): React.ReactNode {
  return <UserContext.Provider value={userProfile}>{children}</UserContext.Provider>;
}
