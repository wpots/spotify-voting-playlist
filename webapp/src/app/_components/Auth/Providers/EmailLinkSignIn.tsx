'use client';

import { Box, TextField } from '@mui/material';
import { SendLinkSignInAction } from './ProviderActions';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import SubmitButton from '../../UI/AppForm/SubmitButton';
import AppNotificationBar from '../../UI/AppNotificationBar';

type EmailLinkSignInProps = {
  // formState: any; // todo better typing
};

export type FormState = {
  status: 'IDLE' | 'OK' | 'ERROR';
  data?: Record<string, string>;
  success?: string;
  error?: string;
};

export default function EmailLinkSignIn(props: EmailLinkSignInProps) {
  const [formState, formAction] = useFormState(SendLinkSignInAction, {
    status: 'IDLE',
  });

  useEffect(() => {
    if (formState.data?.email) {
      window.localStorage.setItem('emailSignIn', formState.data.email);
    }
  }, [formState.data]);

  return (
    <>
      {formState.status != 'OK' ? (
        <Box component='form' action={formAction}>
          <TextField fullWidth label='Email' name='email' type='email' variant='outlined' margin='normal' required />
          <SubmitButton buttonText='Send link' />
        </Box>
      ) : (
        <AppNotificationBar
          title='Gelukt!'
          content={`Er is een mail naar ${formState.data?.email} gestuurd...`}
          sx={{ mt: 2 }}
        />
      )}
    </>
  );
}
