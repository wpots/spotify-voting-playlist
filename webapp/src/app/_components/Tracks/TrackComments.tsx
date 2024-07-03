'use client';
import React, { memo } from 'react';
import { Stack, Box, Avatar, Badge, Typography, Tooltip, List } from '@mui/material';
import { IUser, IVoteItem } from '@domain/content';

interface TrackCommentsProps {
  comments: Partial<IVoteItem>;
}

const TrackComments = memo(function TrackComments({ comments }: TrackCommentsProps) {
  return (
    <>
      <List>
        {comments.map((data: string, idx: number) => {
          return (
            <Typography sx={{ fontStyle: 'italic' }} key={idx} variant='caption' component='li'>
              {data.comment}
            </Typography>
          );
        })}
      </List>
    </>
  );
});
export default TrackComments;
