'use client';

import Button from '@mui/material/Button';
import { signIn, useSession } from 'next-auth/react';
import LoginIcon from '@mui/icons-material/Login';

export default function LoginButton({ children }: { children: React.ReactNode }) {
  const handleLogin = () => signIn('spotify');

  return (
    <Button onClick={handleLogin} variant="contained" endIcon={<LoginIcon />}>
      {children}
    </Button>
  );
}
