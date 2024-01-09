'use client';
import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box, Button, Typography } from '@mui/material';
import VotingStack from './VotingStack';
import { useState, useEffect } from 'react';
interface UserVoteInputProps {
  onVoted: (val: number) => void;
  userVote: number;
}
export default function UserVoteInput({ onVoted, userVote }: UserVoteInputProps) {
  const [vote, setVote] = useState(userVote || 0);
  useEffect(() => {
    onVoted(vote);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vote]);

  const handleVote = (e: React.SyntheticEvent, value: number | null) => {
    if (value) setVote(value);
  };
  return (
    <Box sx={{ paddingTop: '1rem' }}>
      <Typography>Jouw stem</Typography>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
        <VotingStack onChange={handleVote} value={vote} name="user-vote" />
        <Button variant={vote === -1 ? 'outlined' : 'contained'} onClick={e => handleVote(e, vote === -1 ? 0 : -1)}>
          {vote === -1 ? 'unveto' : 'veto'}
        </Button>
      </Stack>
    </Box>
  );
}
