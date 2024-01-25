'use client';
import React, { useCallback } from 'react';
import Stack from '@mui/material/Stack';
import { Box, Button, Typography } from '@mui/material';
import VotingStack from './VotingStack';
import { useState, useEffect } from 'react';
interface UserVoteInputProps {
  onVoted: (val: number) => void;
  userVote: number;
}
export default function UserVoteInput({ onVoted, userVote }: UserVoteInputProps) {
  const [vote, setVote] = useState<number>(userVote || 0);

  useEffect(() => {
    onVoted(vote);
  }, [vote, onVoted]);

  // using callback prevents VotingStack from uneccessarily being rerendered when UserVoteInput is being rerendered (when vote state changes)
  const handleVote = useCallback((e: React.SyntheticEvent, value: number) => {
    setVote(value);
  }, []);
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
