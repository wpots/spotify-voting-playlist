'use client';

import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import VotingStack from './VotingStack';

import VotersList from './VotersList';
interface VotingDialogProps {
  memberLists: Record<string, any[]>;
}

export default function VotingDetails({ memberLists }: VotingDialogProps) {
  return (
    <Box sx={{ p: '1rem', backgroundColor: grey[200] }}>
      {memberLists.voted &&
        memberLists.voted.map(member => (
          <VotersList
            member={member}
            tooltip={member.vote?.comment}
            feedback={<VotingStack name={`vote-${member.id}`} value={member.vote?.rating} readonly></VotingStack>}
            key={`list-${member.id}`}
          />
        ))}
      {memberLists.pending &&
        memberLists.pending.map(member => (
          <VotersList
            member={member}
            feedback={<Typography variant="caption">...nog geen feedback</Typography>}
            key={`list-${member.id}`}
          />
        ))}
    </Box>
  );
}
