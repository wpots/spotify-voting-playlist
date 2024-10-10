'use client';
import React, { useCallback } from 'react';
import Stack from '@mui/material/Stack';
import { Box, Button, Typography } from '@mui/material';
import VotingStack from './VotingStack';
import { useState, useEffect } from 'react';
import VetoIcon from '@mui/icons-material/SentimentVeryDissatisfied';
interface VoteRatingInputProps {
  onVoted: (val: number) => void;
  userVote?: number;
}
export default function VoteRatingInput({ onVoted, userVote }: VoteRatingInputProps) {
  const [vote, setVote] = useState<number>(userVote || 0);
  const isVetod = vote === -1;

  useEffect(() => {
    onVoted(vote);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vote]);

  // using callback prevents VotingStack from uneccessarily being rerendered when UserVoteInput is being rerendered (when vote state changes)
  const handleVote = useCallback((e: React.SyntheticEvent, value: number) => {
    setVote(value);
  }, []);
  return (
    <Box>
      <Stack direction='row' alignItems='center' justifyContent='space-between' spacing={2}>
        <VotingStack onChange={handleVote} value={vote} name='user-vote' precision={1} />
        <Button
          color='error'
          startIcon={<VetoIcon />}
          variant={isVetod ? 'outlined' : 'contained'}
          onClick={e => handleVote(e, vote === -1 ? 0 : -1)}
        >
          {isVetod ? 'unveto' : 'veto'}
        </Button>
      </Stack>
    </Box>
  );
}
2;
