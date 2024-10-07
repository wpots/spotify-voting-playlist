'use client';

import Button from '@mui/material/Button';
import { signOut } from './Providers/SignInActions';

export default function LogoutButton({ children }: { children: React.ReactNode }) {
  const handleLogout = async () => await signOut();

  return (
    <Button onClick={handleLogout} variant='contained' size='small'>
      {children}
    </Button>
  );
}
