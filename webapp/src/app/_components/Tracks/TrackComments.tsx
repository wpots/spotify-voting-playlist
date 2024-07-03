'use client';
import React, { memo } from 'react';
import { Stack, Box, Avatar, Badge, Typography, Tooltip, List } from '@mui/material';
import { IUser } from '@domain/content';

interface TrackCommentsProps {
  comments: string[];
}

const TrackComments = memo(function TrackComments({ comments }: TrackCommentsProps) {
  return (
    <>
      <List>
        {comments.map((comment: string, idx: number) => {
          return (
            <Typography sx={{ fontStyle: 'italic' }} key={idx} variant='caption'>
              {comment}
            </Typography>
          );
        })}
      </List>
    </>
  );
});
export default TrackComments;
