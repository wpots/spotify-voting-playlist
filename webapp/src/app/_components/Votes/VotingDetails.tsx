'use client';

import { Box, Typography } from '@mui/material';
import VotingStack from './VotingStack';

import VotersList from './VotersList';
import { ITrack, IUser } from '@domain/content';
import { useTrack } from '../Tracks/Track.hook';
interface VotingDialogProps {
  details?: ITrack;
}

export default function VotingDetails({ details }: Readonly<VotingDialogProps>) {
  const { voteStatistics } = useTrack(details);
  return (
    <Box sx={{ p: '1rem' }}>
      {voteStatistics?.voted?.map((member: IUser) => (
        <VotersList
          member={member}
          tooltip={member.vote?.comment}
          feedback={<VotingStack name={`vote-${member.id}`} value={member.vote?.rating} readonly></VotingStack>}
          key={`list-${member.id}`}
        />
      ))}
      {voteStatistics?.pending?.map((member: IUser) => (
        <VotersList
          member={member}
          feedback={<Typography variant='caption'>...nog geen feedback</Typography>}
          key={`list-${member.id}`}
        />
      ))}
    </Box>
  );
}
