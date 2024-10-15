'use client';

import { Box, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { useAuthentication } from '@/utils/authentication/ui';
import AppNotificationBar from '@/app/_components/UI/AppNotificationBar';
import { useBandCollection } from '@/app/_hooks/useCollections';
import FileUpload from '../UI/AppForm/FileUpload';

export default function ProfileEdit() {
  const { isBandAdmin } = useBandCollection();
  const [formState, formAction] = useFormState(action, {
    status: 'IDLE',
  });

  return (
    <>
      {formState.status !== 'OK' ? (
        <Box component='form' action={formAction}>
          {isBandAdmin && (
            <TextField
              autoComplete='username'
              fullWidth
              label='Proxy for'
              name='profileId'
              type='profileId'
              variant='outlined'
              margin='normal'
            />
          )}
          <TextField
            autoComplete='username'
            fullWidth
            label='Naam'
            name='displayName'
            type='displayName'
            variant='outlined'
            margin='normal'
            required
          />
          <FileUpload />

          {formState.error && <AppNotificationBar title='Oops' content={formState.error} type='error' />}
          <Button type='submit' fullWidth variant='contained' color='primary' sx={{ mt: 2 }}>
            update profiel
          </Button>
        </Box>
      ) : (
        reset && (
          <AppNotificationBar
            title='Verzonden!'
            content={`Er is een mail naar ${formState.data?.email} gestuurd. Volg de instructies om een nieuw wachtwoord aan te maken en log daarna opnieuw in.`}
            sx={{ mt: 2 }}
          />
        )
      )}
    </>
  );
}
