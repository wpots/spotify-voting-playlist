'use client';

import { Box, TextField, Button } from '@mui/material';

import { PhoneSignInAction } from './ProviderActions';

type PhoneSignInProps = {
  // formState: any; // todo better typing
};

export default function PhoneSignIn(props: PhoneSignInProps) {
  return (
    <Box component='form' action={PhoneSignInAction}>
      <TextField fullWidth label='Telephone' name='phone' type='text' variant='outlined' margin='normal' required />
      <Button type='submit' fullWidth variant='contained' color='success' sx={{ mt: 2 }}>
        Send sms code
      </Button>
    </Box>
  );
}
