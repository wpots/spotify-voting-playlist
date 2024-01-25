'use client';
import React, { memo } from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VetoIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { ITrack } from '@domain/content';
import { red, grey } from '@mui/material/colors';
interface VotingStackProps {
  name: string;
  value: number | string;
  readonly?: boolean;
  onChange?: (e: React.SyntheticEvent, value: number) => void;
}

const VotingStack = memo(function VotingStack({ name, value, readonly, onChange }: VotingStackProps) {
  const rating = parseFloat(value as string) || 0;

  return (
    <Stack spacing={1} sx={{ display: 'inline-flex' }}>
      <Rating
        sx={{ color: '#ff3d47' }}
        readOnly={readonly || rating === -1}
        name={name}
        value={rating}
        precision={0.2}
        max={5}
        icon={<FavoriteIcon fontSize="inherit" />}
        emptyIcon={rating === -1 ? <VetoIcon /> : <FavoriteBorderIcon fontSize="inherit" />}
        // @ts-ignore
        onChange={onChange}
      />
    </Stack>
  );
});

export default VotingStack;
