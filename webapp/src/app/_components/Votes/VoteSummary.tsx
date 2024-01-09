'use client';
import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Button, IconButton, Typography } from '@mui/material';
import BandMembers from '../Band/BandMembers';
import MoreIcon from '@mui/icons-material/More';
import type { ITrack, IUser, IVote } from '@domain/content';
import votesMapper from '@/utils/votes/votes.mapper';
import useUser from '@/app/_hooks/useUser';
import { useSession } from 'next-auth/react';
import useVoting from '@/app/_hooks/useVoting';

export default function VoteSummary({ votes }: { votes?: IVote }) {
  const { userVote, memberStats } = useVoting({ votes });
  return (
    <>
      <Stack spacing={1} alignItems="end">
        <Rating
          sx={{ color: '#ff3d47' }}
          name="read-only"
          readOnly
          value={votes?.average ?? 0}
          precision={1}
          max={5}
          icon={<FavoriteIcon fontSize="inherit" />}
          emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
        />
        <Stack direction="row">
          {memberStats.voted?.length > 0 && <BandMembers members={memberStats.voted}></BandMembers>}
          {memberStats.pending?.length > 0 && (
            <BandMembers members={memberStats.pending} className="pending"></BandMembers>
          )}
        </Stack>
        {}
      </Stack>
    </>
  );
}
