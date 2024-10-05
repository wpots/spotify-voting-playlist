'use client';
import { Alert, AlertTitle, SxProps, Typography } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';
import LogoutButton from '../Auth/LogoutButton';
import { PropsWithChildren } from 'react';
export default function AppNotificationBar(props: PropsWithChildren<{ title: string; content: string; sx: SxProps }>) {
  return (
    <Alert
      sx={props.sx}
      severity='info'
      icon={<ConstructionIcon fontSize='inherit' />}
      // action={<LogoutButton>uitloggen</LogoutButton>}
    >
      <AlertTitle>{props.title}</AlertTitle>
      <Typography variant='caption'>{props.content}</Typography>
    </Alert>
  );
}
