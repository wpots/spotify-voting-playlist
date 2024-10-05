'use client';
import { Snackbar, SnackbarCloseReason } from '@mui/material';
import { SyntheticEvent, useState } from 'react';

type AppSnackProps = {
  message: string;
};

export default function AppSnack(props: AppSnackProps) {
  const [open, setopen] = useState(props.message ? true : false);

  function handleClose(e: Event | SyntheticEvent, reason: SnackbarCloseReason) {
    if (reason === 'clickaway') {
      return;
    }
    setopen(false);
  }

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      autoHideDuration={6000}
      message={props.message}
      onClose={handleClose}
    />
  );
}
