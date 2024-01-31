'use client';
import React, { memo } from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VetoIcon from '@mui/icons-material/SentimentVeryDissatisfied';

interface VotingStackProps {
  name: string;
  value: number;
  readonly?: boolean;
  precision?: number;
  onChange?: (e: React.SyntheticEvent, value: number) => void;
}

const VotingStack = memo(function VotingStack({ name, value, precision, readonly, onChange }: VotingStackProps) {
  const rating = value || 0;
  const isVetod = rating === -1;

  return (
    <Stack spacing={1} sx={{ display: 'inline-flex' }}>
      <Rating
        sx={{ color: '#ff3d47' }}
        readOnly={readonly || isVetod}
        name={name}
        value={rating}
        precision={precision ?? 0.2}
        max={5}
        icon={<FavoriteIcon fontSize="inherit" />}
        emptyIcon={isVetod ? <VetoIcon /> : <FavoriteBorderIcon fontSize="inherit" />}
        // @ts-ignore
        onChange={onChange}
      />
    </Stack>
  );
});

export default VotingStack;
