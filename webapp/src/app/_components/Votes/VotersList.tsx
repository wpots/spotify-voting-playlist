'use client';
import React, { memo } from 'react';
import { Stack, Box, Avatar, Badge, Typography, Tooltip } from '@mui/material';
import { IUser } from '@domain/content';

interface VotersListProps {
  member: IUser;
  feedback: React.ReactNode;
  tooltip?: string;
}

const VotersList = memo(function VotersList({ member, feedback, tooltip }: VotersListProps) {
  return (
    <Stack
      key={`name-${member.id}`}
      spacing={1}
      sx={{ marginBottom: '1rem', gap: '.5rem' }}
      direction='row'
      justifyContent='start'
      flexWrap='wrap'
      alignItems='center'
    >
      {/* <Badge color='info' overlap='circular' badgeContent={'i'} invisible={!member.vote?.comment}>
        <Tooltip
          arrow
          placement='right'
          title={
            tooltip && (
              <Typography variant='caption' component='small'>
                {tooltip}
              </Typography>
            )
          }
        >
          <Avatar alt={member.id} src={member.image} />
        </Tooltip>
      </Badge> */}
      <Typography variant='caption'>{member.name || member.id}</Typography>
      <Box sx={{ ml: 'auto!important' }}>{feedback}</Box>
      {member.vote?.comment && (
        <Box sx={{ flex: '1 0 100%' }}>
          <Typography variant='caption' sx={{ fontStyle: 'italic' }}>
            {member.vote?.comment}
          </Typography>
        </Box>
      )}
    </Stack>
  );
});
export default VotersList;
