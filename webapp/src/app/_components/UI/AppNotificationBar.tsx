'use client';
import { Alert, AlertTitle, SxProps, Typography } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';
import LogoutButton from '../Auth/LogoutButton';
import { PropsWithChildren, ReactNode } from 'react';

type AppNotificationbarProps = {
  title: string;
  content: string;
  sx?: SxProps;
  type?: 'info' | 'success' | 'warning' | 'error';
  icon?: ReactNode;
};
export default function AppNotificationBar(props: PropsWithChildren<AppNotificationbarProps>) {
  return (
    <Alert sx={props.sx} severity={props.type ?? 'info'} icon={props.icon ?? null}>
      <AlertTitle>{props.title}</AlertTitle>
      <Typography variant='caption'>{props.content}</Typography>
    </Alert>
  );
}
