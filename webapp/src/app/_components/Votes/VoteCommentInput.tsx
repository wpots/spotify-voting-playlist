'use client';
import React, { ChangeEvent, ChangeEventHandler, useCallback } from 'react';
import Stack from '@mui/material/Stack';
import { Box, Button, TextField, Typography } from '@mui/material';
import VotingStack from './VotingStack';
import { useState, useEffect } from 'react';
interface VoteCommentInputProps {
  onCommented: (val: string) => void;
  userComment: string;
}

export default function VoteCommentInput({ onCommented, userComment }: VoteCommentInputProps) {
  const [comment, setComment] = useState<string>(userComment);

  useEffect(() => {
    onCommented(comment);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comment]);

  // using callback prevents VotingStack from uneccessarily being rerendered when this component is being rerendered (when state changes)
  const handleComment = useCallback((e: ChangeEvent) => {
    setComment((e.target as HTMLInputElement).value);
  }, []);

  return (
    <Box sx={{ paddingTop: '1rem' }}>
      <Typography variant='caption'>Extra opmerking:</Typography>
      <Stack direction='row' alignItems='center' justifyContent='space-between' spacing={2}>
        <TextField
          id='comment'
          value={comment}
          variant='standard'
          multiline
          maxRows={4}
          sx={{ width: '100%' }}
          onChange={handleComment}
        />
      </Stack>
    </Box>
  );
}
