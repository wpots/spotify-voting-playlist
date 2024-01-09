'use client';
import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VetoIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { ITrack } from '@domain/content';
interface VotingStackProps {
  name: string;
  value: number | string;
  readonly?: boolean;
  onChange?: (e: React.SyntheticEvent, value: number | null) => void;
}

export default function VotingStack({ name, value, readonly, onChange }: VotingStackProps) {
  const rating = parseFloat(value as string);
  return (
    <Stack spacing={1} sx={{ display: 'inline-flex' }}>
      <Rating
        sx={{ color: '#ff3d47' }}
        readOnly={readonly}
        name={name}
        value={rating || 0}
        precision={1}
        max={5}
        icon={<FavoriteIcon fontSize="inherit" />}
        emptyIcon={value === -1 ? <VetoIcon /> : <FavoriteBorderIcon fontSize="inherit" />}
        onChange={onChange}
      />
    </Stack>
  );
}
