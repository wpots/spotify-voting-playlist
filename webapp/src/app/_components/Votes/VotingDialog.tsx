'use client';
import { useCallback, useState } from 'react';
import type { ITrack } from '@domain/content';
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
import UserVoteInput from './UserVoteInput';
import VotingDetails from './VotingDetails';
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
  const handleVoted = useCallback((val: number) => {
    setVoted(val);
  }, []);
  return (
    <Dialog open={open} onClose={() => onClose(true)}>
      <DialogTitle>
        {track && track.name} - {track && track.artists}
      </DialogTitle>
      <Typography
        variant="caption"
        component="a"
        href={track.url}
        target="_blank"
        sx={{ textDecoration: 'underline', px: ' 1.5rem', pb: '1rem', display: 'block' }}
      >
        luister op spotify
      </Typography>
      <Divider />
      <DialogContent dividers>
        <DialogContentText>
          <VotingDetails memberLists={memberStats} />
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
