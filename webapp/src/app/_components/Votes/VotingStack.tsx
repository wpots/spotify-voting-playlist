'use client';
import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { ITrack } from '@domain/content';
interface VotingStackProps {
  name: string;
  value: number;
  readonly?:boolean
}

export default function VotingStack({ name, value, readonly }: VotingStackProps) {
  return (
    <Stack spacing={1}>
      <Rating
        sx={{ color: '#ff3d47' }}
        readOnly={readonly}
        name={name}
        value={value || 0}
        precision={1}
        max={5}
        icon={<FavoriteIcon fontSize="inherit" />}
        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
      />
    </Stack>
  );
}
