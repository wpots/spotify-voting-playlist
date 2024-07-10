'use client';
import * as React from 'react';
import Stack from '@mui/material/Stack';

import BandMembers from '../Band/BandMembers';
import VotingStack from './VotingStack';

export default function VoteSummary({ votes }: { votes?: any }) {
  return (
    <Stack spacing={1} alignItems='end'>
      <VotingStack name='vote-summary' readonly={true} value={votes.isVetod ? -1 : votes.averageRating ?? 0} />

      <Stack direction='row'>
        {votes.voted?.length > 0 && <BandMembers members={votes.voted}></BandMembers>}
        {votes.pending?.length > 0 && <BandMembers members={votes.pending} className='pending'></BandMembers>}
      </Stack>
    </Stack>
  );
}
