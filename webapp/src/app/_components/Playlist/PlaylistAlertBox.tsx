'use client';
import { PropsWithChildren, useState } from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

export default function PlaylistAlertBox({
  title = 'Je hebt nog niet gestemd!',
  isOpen,
  children,
}: PropsWithChildren<{ title: string; isOpen: boolean }>) {
  const [openAlert, setOpenAlert] = useState(isOpen);

  return (
    <Dialog open={openAlert} onClose={() => setOpenAlert(false)} sx={{ p: '2rem' }}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenAlert(false)}>Nu even niet</Button>
      </DialogActions>
    </Dialog>
  );
}
