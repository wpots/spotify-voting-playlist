'use client';

import { Box, TextField, Typography } from '@mui/material';
import { useFormState } from 'react-dom';
import SubmitButton from '../../UI/AppForm/SubmitButton';
import AppNotificationBar from '../../UI/AppNotificationBar';
import { useAuthentication } from '@/utils/authentication/ui';

export default function EmailLinkSignIn() {
  const { sendLinkSignInAction } = useAuthentication();

  const [formState, formAction] = useFormState(sendLinkSignInAction, {
    status: 'IDLE',
  });

  const isInvalid = formState.status === 'ERROR';

  return (
    <>
      {formState.status != 'OK' ? (
        <Box component='form' action={formAction}>
          <TextField
            fullWidth
            label='Email'
            name='email'
            type='email'
            variant='outlined'
            margin='normal'
            required
            error={isInvalid}
          />
          {isInvalid && (
            <Typography component='p' variant='caption'>
              {formState.error}
            </Typography>
          )}
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
