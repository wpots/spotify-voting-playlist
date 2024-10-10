'use client';
import type React from 'react';
import { deepOrange, red, grey, lightGreen, lime, amber } from '@mui/material/colors';
import {
  Divider,
  ListItemButton,
  Box,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  useMediaQuery,
} from '@mui/material';

import type { ITrack, IVote } from '@domain/content';
import VoteSummary from '../Votes/VoteSummary';
import TrackComments from './TrackComments';
import TrackLink from './TrackLink';
import { useTrack } from './Track.hook';

interface TrackProps {
  track: ITrack;

  divider: number;
  controls?: React.ReactNode;
  onTrackSelected?: () => void;
  enhancedView?: boolean;
  children?: React.ReactNode;
}

export default function Track({ track, divider, onTrackSelected, enhancedView, controls, children }: TrackProps) {
  const { voteStatistics, blockedByVeto } = useTrack(track);
  const preferDark = useMediaQuery('(prefers-color-scheme: dark)');

  const handleTrackSelected = () => {
    if (onTrackSelected) onTrackSelected();
  };

  const splitVoteAverage = {
    floor: track?.votes?.average ? Math.floor(track?.votes?.average) : 0,
    decimals: track?.votes?.average ? track?.votes?.average % 1 : 0,
  };
  const alpha = splitVoteAverage?.decimals?.toFixed(1);

  const comments = track.votes?.items.filter(i => i.comment).map(i => i.comment as string) || [];

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

  const backgroundColor = blockedByVeto ? red[`${preferDark ? 900 : 200}`] : 'transparent';

  return (
    <>
      {divider > 0 && <Divider component='li' />}
      <ListItem disablePadding sx={{ backgroundColor }} id={track.id}>
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
            className='text-ellipses'
            sx={{
              flex: '1 1 20%',
              overflow: 'hidden',
              whiteSpace: ['nowrap', 'normal'],
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
            {enhancedView && voteStatistics ? (
              <VoteSummary votes={voteStatistics} />
            ) : (
              <TrackLink title='luister op spotify' url={track.url} />
            )}
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
