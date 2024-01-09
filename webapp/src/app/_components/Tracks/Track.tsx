'use client';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { Divider, ListItemButton, Box, useMediaQuery, useTheme, Dialog } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { ITrack } from '@domain/content';
import React, { useState } from 'react';

interface TrackProps {
  track: ITrack;
  divider: number;
  controls?: React.ReactNode;
  onTrackSelected?: () => void;
  children?: React.ReactNode;
}

export default function Track({ track, divider, onTrackSelected, controls, children }: TrackProps) {
  const theme = useTheme();
  const onlyDesktops = useMediaQuery(theme?.breakpoints.up('sm'));
  const blockedByVeto = track.votes?.veto && track.votes.veto?.length > 0;
  const handleTrackSelected = () => {
    if (onTrackSelected) onTrackSelected();
  };
  return (
    <>
      {divider > 0 && <Divider component="li" />}
      <ListItem disablePadding sx={{ backgroundColor: blockedByVeto ? 'red' : 'transparent' }}>
        <ListItemButton sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }} onClick={handleTrackSelected}>
          <ListItemText sx={{ flex: ['1 1 50%', '1 1 auto'] }} primary={track.name} secondary={<>{track.artists}</>} />

          <Box sx={{ flex: ['0 0 50%', '0 0 25%'], order: { xs: 10 } }}>{controls}</Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flex: ['0 0 50%', '0 0 25%'],
              order: { sm: 10 },
              marginLeft: { sm: '2rem' },

              justifyContent: 'flex-end',
            }}
          >
            {children}
          </Box>
        </ListItemButton>
      </ListItem>
    </>
  );
}
