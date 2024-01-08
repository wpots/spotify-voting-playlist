'use client';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import PlayIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import {
  AvatarGroup,
  Avatar,
  Divider,
  IconButton,
  ListItemButton,
  Stack,
  ListItemSecondaryAction,
  Button,
  Box,
  CircularProgress,
  useMediaQuery,
  Theme,
  useTheme,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import type { ITrack } from '@domain/content';
import Voting from '../Votes/VotingDetails';
import BandMembers from '../Band/BandMembers';
import React, { useState } from 'react';
import TrackControls from './TrackControls';
import VoteSummary from '../Votes/VoteSummary';

interface TrackProps {
  track: ITrack;
  divider: number;
  controls?: React.ReactNode;
  children?: React.ReactNode;
}

export default function Track({ track, divider, controls, children }: TrackProps) {
  const theme = useTheme();
  const onlyDesktops = useMediaQuery(theme?.breakpoints.up('sm'));
  const handleClick = () => {};
  return (
    <>
      {divider > 0 && <Divider component="li" />}
      <ListItem disablePadding>
        <ListItemButton sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }} onClick={handleClick}>
          <ListItemText
            sx={{ flex: ['1 1 50%', '1 1 auto'] }}
            primary={track.name}
            secondary={
              <>
                <Typography component="p" variant="body2" color="text.primary">
                  {track.artists.map(artist => artist.name).toString()}
                </Typography>
                {onlyDesktops && <Typography variant="caption">added by: {track.added_by.id}</Typography>}
              </>
            }
          />

          <Box sx={{ flex: ['0 0 50%', '0 0 25%'], order: { xs: 10 } }}>{controls}</Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flex: ['0 0 50%', '0 0 25%'],
              order: { sm: 10 },
              marginLeft: { sm: '2rem' },
              marginBottom: { xs: controls && '1rem', sm: '0' },
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
