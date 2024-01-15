'use client';
import { useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { ITrack } from '@domain/content';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Typography,
} from '@mui/material';
import useVoting from '@/app/_hooks/useVoting';
import VotingStack from './VotingStack';
import UserVoteInput from './UserVoteInput';
interface VotingDialogProps {
  track: ITrack;
  open: boolean;
  onClose: (val: boolean) => void;
}

export default function VotingDialog({ track, open, onClose }: VotingDialogProps) {
  const { memberStats, userVote, setUserVote } = useVoting(track);
  const [voted, setVoted] = useState<number>();
  const handleSaveAndClose = async () => {
    if (voted) {
      await setUserVote(track.id, voted);
      onClose(true);
    }
  };
  const handleVoted = (val: number) => {
    setVoted(val);
  };
  return (
    <Dialog open={open} onClose={() => onClose(true)}>
      <DialogTitle>
        {track && track.name} - {track && track.artists}
        <Typography
          variant="caption"
          component="a"
          href={track.url}
          target="_blank"
          sx={{ display: 'block', textDecoration: 'underline' }}
        >
          luister op spotify
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText>
          {memberStats.voted.map(member => {
            return (
              <Stack
                key={`name-${member.id}`}
                spacing={1}
                sx={{ marginBottom: '1rem' }}
                direction="row"
                justifyContent="space-between"
              >
                <Typography variant="caption">{member.name || member.id}</Typography>
                <VotingStack name={`vote-${member.id}`} value={member.vote} readonly></VotingStack>
              </Stack>
            );
          })}
          {memberStats.pending.map(member => {
            return (
              <Stack
                key={`name-${member.id}`}
                spacing={1}
                sx={{ marginBottom: '1rem' }}
                direction="row"
                justifyContent="space-between"
              >
                <Typography variant="caption">{member.name || member.id}</Typography>
                <Typography variant="caption">...nog geen feedback</Typography>
              </Stack>
            );
          })}

          <UserVoteInput onVoted={handleVoted} userVote={userVote}></UserVoteInput>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: '1rem' }}>
        <Button onClick={() => onClose(true)}>terug</Button>
        <Button onClick={handleSaveAndClose} disabled={!voted || userVote === voted}>
          opslaan
        </Button>
      </DialogActions>
    </Dialog>
  );
}
