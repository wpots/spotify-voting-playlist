'use client';
import React, { memo } from 'react';
import Stack from '@mui/material/Stack';
import { IUser } from '@domain/content';
import { Typography } from '@mui/material';

interface VotersListProps {
  member: IUser;
  feedback: React.ReactNode;
}

const VotersList = memo(function VotersList({ member, feedback }: VotersListProps) {
  return (
    <Stack
      key={`name-${member.id}`}
      spacing={1}
      sx={{ marginBottom: '1rem' }}
      direction="row"
      justifyContent="space-between"
    >
      <Typography variant="caption">{member.name || member.id}</Typography>
      {feedback}
    </Stack>
  );
});
export default VotersList;
