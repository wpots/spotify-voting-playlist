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
  Typography,
} from '@mui/material';
import useVoting from '@/app/_hooks/useVoting';
import VotingStack from './VotingStack';
interface VotingDialogProps {
  track: ITrack;
  open: boolean;
  onClose: () => void;
}

export default function VotingDialog({ track, open, onClose }: VotingDialogProps) {
  const { memberStats } = useVoting({ track });

  const handleSaveAndClose = () => {};
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {track && track.name} - {track && track.artists}
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText>
          {[...memberStats.voted, ...memberStats.pending].map(member => {
            return (
              <Stack direction="row" justifyContent="space-between" key={member.id}>
                <Typography variant="caption">{member.id}</Typography>
                <VotingStack name={`vote-${member.id}`} value={member.vote?.vote} readonly></VotingStack>
              </Stack>
            );
          })}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>terug</Button>
        <Button onClick={handleSaveAndClose}>opslaan</Button>
      </DialogActions>
    </Dialog>
  );
}
