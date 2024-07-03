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

import type { ITrack, IVoteItem } from '@domain/content';
import TrackComments from '../Tracks/TrackComments';
import { useCallback } from 'react';

interface TrackProps {
  track: ITrack;
  divider: number;
  controls?: React.ReactNode;
  onTrackSelected?: () => void;
  enhancedView?: boolean;
  children?: React.ReactNode;
}

export default function Track({ track, divider, onTrackSelected, enhancedView, controls, children }: TrackProps) {
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

  const comments =
    track.votes?.items.filter(i => i.comment).map(i => ({ comment: i.comment as string, user: i.userId })) || [];

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
        <ListItemButton
          sx={{ justifyContent: ['flex-start'], flexWrap: 'wrap', gap: '.5rem', padding: '.5rem' }}
          onClick={handleTrackSelected}
        >
          {enhancedView && (
            <ListItemAvatar sx={{ minWidth: '40px' }}>
              <Avatar sx={{ bgcolor: avatarColor }}>
                <Typography variant='caption'>{track.votes?.average}</Typography>
              </Avatar>
            </ListItemAvatar>
          )}
          <ListItemText
            sx={{
              flex: '1 1 auto',
              maxWidth: ['128px', '268px', '390px'],
              overflow: 'hidden',
              whiteSpace: ['nowrap', 'normal'],
              textOverflow: 'ellipsis',
            }}
            primary={track.name}
            secondary={<>{track.artists}</>}
          />

          <Box sx={{ flex: ['0 0 auto'], order: { xs: 10 } }}>{controls}</Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flex: ['0 0 40%'],

              marginLeft: 'auto',

              justifyContent: 'flex-end',
            }}
          >
            {children}
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flex: ['0 0 100%'],
            }}
          >
            {enhancedView && comments.length > 0 && <TrackComments comments={comments} />}
          </Box>
        </ListItemButton>
      </ListItem>
    </>
  );
}
