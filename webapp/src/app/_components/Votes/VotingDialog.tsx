'use client';
import { useState } from 'react';
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
  onClose: () => void;
}

export default function VotingDialog({ track, open, onClose }: VotingDialogProps) {
  const { memberStats, userVote } = useVoting({ track });
  const [voted, setVoted] = useState<number | null>(null);

  const handleSaveAndClose = async () => {
    if (voted) {
      try {
        const response = await fetch(`/api/votes/${track.id}?vote=${voted}`, { method: 'POST' });
        console.log(response);
      } catch (error) {
        console.error(error);
      }
      onClose();
    }
  };
  const handleVoted = (val: number) => {
    console.log('d', val);
    setVoted(val);
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {track && track.name} - {track && track.artists}
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText>
          {[...memberStats.voted, ...memberStats.pending].map(member => {
            return (
              <Stack
                spacing={1}
                sx={{ marginBottom: '1rem' }}
                direction="row"
                justifyContent="space-between"
                key={member.id}
              >
                <Typography variant="caption">{member.name || member.id}</Typography>
                <VotingStack name={`vote-${member.id}`} value={member.vote?.vote} readonly></VotingStack>
              </Stack>
            );
          })}
          <Divider></Divider>
          <UserVoteInput onVoted={handleVoted} userVote={userVote}></UserVoteInput>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: '1rem' }}>
        <Button onClick={onClose}>terug</Button>
        <Button onClick={handleSaveAndClose} disabled={!voted}>
          opslaan
        </Button>
      </DialogActions>
    </Dialog>
  );
}
