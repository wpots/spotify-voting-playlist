"use client";

import Button from "@mui/material/Button";
import { signOut } from "next-auth/react";

export default function LogoutButton({ children }: { children: React.ReactNode }) {
  const handleLogin = () => signOut({ callbackUrl: "/" });

  return (
    <Button onClick={handleLogin} variant="contained" size="small">
      {children}
    </Button>
  );
}
