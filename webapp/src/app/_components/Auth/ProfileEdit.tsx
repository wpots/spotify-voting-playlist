'use client';

import { Box, TextField, Button } from '@mui/material';
import { useFormState } from 'react-dom';
import AppNotificationBar from '@/app/_components/UI/AppNotificationBar';
import { useBandCollection } from '@/app/_hooks/useCollections';
import { ProfileEditAction } from './ProfileEdit.action';

export default function ProfileEdit() {
  const { isBandAdmin, memberIds } = useBandCollection();
  const [formState, formAction] = useFormState(ProfileEditAction, {
    status: 'IDLE',
  });

  return (
    formState.status !== 'OK' && (
      <Box component='form' action={formAction}>
        <TextField
          autoComplete='on'
          fullWidth
          label='Profiel Naam'
          name='displayName'
          type='displayName'
          variant='outlined'
          margin='normal'
          required
        />
        {/* <FileUpload /> */}

        {formState.error && <AppNotificationBar title='Oops' content={formState.error} type='error' />}
        <Button type='submit' fullWidth variant='contained' color='primary' sx={{ mt: 2 }}>
          update profiel
        </Button>
      </Box>
    )
  );
}
