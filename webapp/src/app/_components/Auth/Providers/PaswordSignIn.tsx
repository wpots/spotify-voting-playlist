'use client';

import { Box, TextField, Button } from '@mui/material';

import { PasswordSignInAction } from './ProviderActions';

type PasswordSignInProps = {
  // formState: any; // todo better typing
};

export default function PasswordSignIn(props: PasswordSignInProps) {
  return (
    <Box component='form' action={PasswordSignInAction}>
      <TextField fullWidth label='Email' name='email' type='email' variant='outlined' margin='normal' required />
      <TextField
        fullWidth
        label='Password'
        name='password'
        type='password'
        variant='outlined'
        margin='normal'
        required
      />
      <Button type='submit' fullWidth variant='contained' color='primary' sx={{ mt: 2 }}>
        Sign In
      </Button>
      <Button type='button' color='primary' sx={{ mt: 1 }}>
        reset password
      </Button>
    </Box>
  );
}
