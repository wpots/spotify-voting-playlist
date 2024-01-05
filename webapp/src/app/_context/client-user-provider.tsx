"use client";
import { IBand } from "@domain/band";
import { IVote } from "@domain/playlist";
import React, { createContext } from "react";

export const UserContext = createContext<Record<any, any> | undefined>(undefined); //TODO better typing

export default function UserContextProvider({
  children,
  userProfile,
}: {
  children: React.ReactNode;
  userProfile: {
    userBands?: IBand[];
    userInfo: Record<string, any>;
  };
}): React.ReactNode {
  return <UserContext.Provider value={userProfile}>{children}</UserContext.Provider>;
}
