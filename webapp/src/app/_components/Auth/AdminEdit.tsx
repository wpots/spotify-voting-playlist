'use client';

import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent,
  RadioGroup,
  FormControlLabel,
  Switch,
  FormControl,
  InputLabel,
  Typography,
} from '@mui/material';
import { useFormState } from 'react-dom';
import AppNotificationBar from '@/app/_components/UI/AppNotificationBar';
import { useBandCollection } from '@/app/_hooks/useCollections';
import { ProfileEditAction } from './ProfileEdit.action';
import { useState } from 'react';
import AppBanner from '../UI/AppBanner';

export default function AdminEdit() {
  const { members, getMemberNameById } = useBandCollection();
  const [proxy, setProxy] = useState<string>('');
  const [formState, formAction] = useFormState(ProfileEditAction, {
    status: 'IDLE',
  });

  function handleOnChange(e: SelectChangeEvent) {
    setProxy(e.target.value);
  }

  return (
    <>
      <AppBanner title='Admin Profile Tools' />
      {formState.status !== 'OK' && (
        <Box component='form' action={formAction}>
          <FormControl fullWidth>
            <InputLabel id='memberSelect'>Proxy For</InputLabel>
            <Select
              fullWidth
              value={proxy}
              onChange={handleOnChange}
              name='memberId'
              label='Proxy For'
              labelId='memberSelect'
              displayEmpty
            >
              {members?.map(m => (
                <MenuItem key={`select-${m.id}`} value={m.id}>
                  {m.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            autoComplete='on'
            fullWidth
            label='Profiel Naam'
            name='displayName'
            type='text'
            variant='outlined'
            margin='normal'
          />
          <Typography variant='caption'>Custom Claims</Typography>
          <TextField
            autoComplete='on'
            fullWidth
            label='Spotify ID'
            name='spotifyId'
            type='text'
            variant='outlined'
            margin='normal'
          />

          <FormControlLabel control={<Switch />} label='admin rights' name='isAdmin' />

          {/* <FileUpload /> */}

          {formState.error && <AppNotificationBar title='Oops' content={formState.error} type='error' />}
          <Button type='submit' fullWidth variant='contained' color='primary' sx={{ mt: 2 }}>
            update {getMemberNameById(proxy)}'s profiel
          </Button>
        </Box>
      )}
    </>
  );
}
