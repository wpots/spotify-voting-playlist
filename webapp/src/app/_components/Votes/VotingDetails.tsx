'use client';

import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import VotingStack from './VotingStack';

import VotersList from './VotersList';
import { IUser } from '@domain/content';
interface VotingDialogProps {
  stats: Record<string, any>;
}

export default function VotingDetails({ stats }: Readonly<VotingDialogProps>) {
  return (
    <Box sx={{ p: '1rem', backgroundColor: grey[200] }}>
      {stats.voted?.map((member: IUser) => (
        <VotersList
          member={member}
          tooltip={member.vote?.comment}
          feedback={<VotingStack name={`vote-${member.id}`} value={member.vote?.rating} readonly></VotingStack>}
          key={`list-${member.id}`}
        />
      ))}
      {stats.pending?.map((member: IUser) => (
        <VotersList
          member={member}
          feedback={<Typography variant='caption'>...nog geen feedback</Typography>}
          key={`list-${member.id}`}
        />
      ))}
    </Box>
  );
}
