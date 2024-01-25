'use client';

import { Typography } from '@mui/material';

import VotingStack from './VotingStack';

import VotersList from './VotersList';
interface VotingDialogProps {
  memberLists: Record<string, any[]>;
}

export default function VotingDetails({ memberLists }: VotingDialogProps) {
  return (
    <>
      {memberLists.voted &&
        memberLists.voted.map(member => (
          <VotersList
            member={member}
            feedback={<VotingStack name={`vote-${member.id}`} value={member.vote} readonly></VotingStack>}
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
    </>
  );
}
