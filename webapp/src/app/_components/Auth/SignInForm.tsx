'use client';

import React, { useState } from 'react';
import { Box, Button, Typography, Container, Stack, ButtonGroup } from '@mui/material';
import PasswordSignIn from './Providers/PaswordSignIn';
import EmailLinkSignIn from './Providers/EmailLinkSignIn';

export default function SignInForm() {
  const providers = [
    { id: 'email', component: <EmailLinkSignIn /> },
    { id: 'password', component: <PasswordSignIn /> },
  ];
  const [provider, setProvider] = useState(providers[0]);

  return (
    <Container maxWidth='sm'>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Stack spacing={2}>
          <Typography align='center' variant='caption' component='p' gutterBottom>
            sign in with:
          </Typography>
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
        </Stack>
        {provider.component}
      </Box>
    </Container>
  );
}
