'use client';

import { Box, TextField, Button } from '@mui/material';

import { GoogleSignInAction } from './SignInActions';

type GoogleSignInProps = {
  // formState: any; // todo better typing
};

export default function GoogleSignIn(props: GoogleSignInProps) {
  return (
    <Box component='form' action={GoogleSignInAction}>
      <Button type='submit' fullWidth variant='contained' color='primary' sx={{ mt: 2 }}>
        Sign in with Google
      </Button>
    </Box>
  );
}
