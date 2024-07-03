'use client';
import type React from 'react';
import { deepOrange, red, grey, lightGreen, lime, amber } from '@mui/material/colors';
import {
  Divider,
  ListItemButton,
  Box,
  useMediaQuery,
  useTheme,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from '@mui/material';

import type { ITrack } from '@domain/content';

interface TrackProps {
  track: ITrack;
  divider: number;
  controls?: React.ReactNode;
  onTrackSelected?: () => void;
  showAvatar?: boolean;
  children?: React.ReactNode;
}

export default function Track({ track, divider, onTrackSelected, showAvatar, controls, children }: TrackProps) {
  const theme = useTheme();
  const onlyDesktops = useMediaQuery(theme?.breakpoints.up('sm')); // reinstall what was lost
  const blockedByVeto = track.votes?.veto && track.votes.veto?.length > 0;
  const handleTrackSelected = () => {
    if (onTrackSelected) onTrackSelected();
  };

  const splitVoteAverage = {
    floor: track?.votes?.average ? Math.floor(track?.votes?.average) : 0,
    decimals: track?.votes?.average ? track?.votes?.average % 1 : 0,
  };
  const alpha = splitVoteAverage?.decimals?.toFixed(1);

  const avatarColor = !track.votes?.average
    ? grey[100]
    : track.votes?.average >= 3.5
    ? lightGreen[500]
    : track.votes?.average >= 2.6
    ? lime[500]
    : splitVoteAverage.floor >= 2
    ? amber[500]
    : splitVoteAverage.floor >= 0
    ? deepOrange['500']
    : grey['100'];

  return (
    <>
      {divider > 0 && <Divider component='li' />}
      <ListItem disablePadding sx={{ backgroundColor: blockedByVeto ? red[200] : 'transparent' }} id={track.id}>
        <ListItemButton sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }} onClick={handleTrackSelected}>
          {showAvatar && (
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: avatarColor }}>
                <Typography variant='caption'>{track.votes?.average}</Typography>
              </Avatar>
            </ListItemAvatar>
          )}
          <ListItemText
            sx={{ flex: ['1 1 50%', '1 1 auto'], maxWidth: '220px' }}
            primary={track.name}
            secondary={<>{track.artists}</>}
          />

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
