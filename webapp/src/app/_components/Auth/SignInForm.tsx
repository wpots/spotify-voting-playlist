'use client';

import React, { useState } from 'react';
import { Box, Button, Container, Stack, ButtonGroup } from '@mui/material';
import PasswordSignIn from './Providers/PaswordSignIn';
import EmailLinkSignIn from './Providers/EmailLinkSignIn';
import { useAuthentication } from '@/libs/firebase/authentication';
import { useRouter } from 'next/navigation';

export default function SignInForm() {
  const providers = [
    { id: 'wachtwoord', component: <PasswordSignIn /> },
    // { id: 'email', component: <EmailLinkSignIn /> },
  ];
  const [provider, setProvider] = useState(providers[0]);
  const { auth } = useAuthentication();
  const router = useRouter();

  return (
    <Container maxWidth='sm'>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* <Stack spacing={2}>
          <ButtonGroup>
            {providers.map(p => (
              <Button
                type='button'
                variant={provider.id === p.id ? 'contained' : 'outlined'}
                color='primary'
                onClick={() => setProvider(p)}
                key={p.id}
              >
                {p.id}
              </Button>
            ))}
          </ButtonGroup>
        </Stack> */}
        {auth?.user?.uid ? (
          <Button variant='contained' size='medium' onClick={() => router.push('/')}>
            mijn band
          </Button>
        ) : (
          provider.component
        )}
      </Box>
    </Container>
  );
}
