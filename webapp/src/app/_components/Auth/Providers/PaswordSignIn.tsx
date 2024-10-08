'use client';

import { Box, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { useAuthentication } from '@/utils/authentication/ui';
import AppNotificationBar from '@/app/_components/UI/AppNotificationBar';

export default function PasswordSignIn() {
  const [reset, setReset] = useState(false);
  const { passwordResetAction, passwordSignInAction } = useAuthentication();
  const action = !reset ? passwordSignInAction : passwordResetAction;
  const [formState, formAction] = useFormState(action, {
    status: 'IDLE',
  });

  async function handlePasswordReset() {
    setReset(true);
  }

  return (
    <>
      {formState.status !== 'OK' ? (
        <Box component='form' action={formAction}>
          <TextField fullWidth label='Email' name='email' type='email' variant='outlined' margin='normal' required />
          {!reset && (
            <TextField
              fullWidth
              label='Password'
              name='password'
              type='password'
              variant='outlined'
              margin='normal'
              required
            />
          )}
          <Button type='submit' fullWidth variant='contained' color='primary' sx={{ mt: 2 }}>
            {reset ? 'reset password' : 'sign in'}
          </Button>
          {!reset && (
            <Button type='button' color='primary' sx={{ mt: 1 }} onClick={handlePasswordReset}>
              reset password
            </Button>
          )}
        </Box>
      ) : (
        reset && (
          <AppNotificationBar
            title='Verzonden!'
            content={`Er is een mail naar ${formState.data?.email} gestuurd...`}
            sx={{ mt: 2 }}
          />
        )
      )}
    </>
  );
}
