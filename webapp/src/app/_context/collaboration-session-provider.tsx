"use client";
import React, { createContext } from "react";

const CollaborationContext = createContext({});

export default function CollaborationContextProvider({
  children,
  collaboration,
}: {
  children: React.ReactNode;
  collaboration: any;
}): React.ReactNode {
  return <CollaborationContext.Provider value={collaboration}>{children}</CollaborationContext.Provider>;
}
