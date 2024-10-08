'use client';

import { useAuthentication } from '@/utils/authentication/ui';
import Button from '@mui/material/Button';

export default function LogoutButton({ children }: { children: React.ReactNode }) {
  const { signOut } = useAuthentication();
  const handleLogout = async () => await signOut();

  return (
    <Button onClick={handleLogout} variant='contained' size='small'>
      {children}
    </Button>
  );
}
