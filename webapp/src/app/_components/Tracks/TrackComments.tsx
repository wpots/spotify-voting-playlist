'use client';
import React, { memo } from 'react';
import { Typography, List } from '@mui/material';

interface TrackCommentsProps {
  comments: string[];
}

const TrackComments = memo(function TrackComments({ comments }: TrackCommentsProps) {
  return (
    <List>
      {comments.map((comment: string, idx: number) => {
        return (
          <Typography sx={{ fontStyle: 'italic' }} key={idx} variant='caption' component='li'>
            {comment}
          </Typography>
        );
      })}
    </List>
  );
});
export default TrackComments;
