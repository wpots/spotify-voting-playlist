'use client';
import React, { useCallback, useState } from 'react';
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
import VoteByRatingInput from './VoteRatingInput';
import VotingDetails from './VotingDetails';
import VoteCommentInput from './VoteCommentInput';
import TrackLink from '../Tracks/TrackLink';
interface VotingDialogProps {
  track: ITrack;
  open: boolean;
  onClose: (val: boolean) => void;
}

export default function VotingDialog({ track, open, onClose }: VotingDialogProps) {
  const { memberStats, userVote, setUserVote } = useVoting(track);
  const [voted, setVoted] = useState<Record<string, any>>({ rating: null, comment: null });

  const handleSaveAndClose = async () => {
    if (voted) {
      await setUserVote(track.id, voted);
      onClose(true);
    }
  };

  const handleVoted = useCallback((vote: { rating?: number; comment?: string }) => {
    setVoted(prev => ({
      ...prev,
      ...(vote.rating && { rating: vote.rating }),
      ...(vote.comment && { comment: vote.comment }),
    }));
  }, []);
  const voteHasChanged = userVote?.rating !== voted?.rating || userVote?.comment !== voted?.comment;

  return (
    <Dialog open={open} onClose={() => onClose(true)}>
      <DialogTitle>
        {track && track.name} - {track && track.artists}
      </DialogTitle>
      <TrackLink title='luister op spotify' url={track.url} />
      <Divider />
      <VotingDetails memberLists={memberStats} />
      <Divider />
      <DialogContent dividers>
        <DialogContentText>
          <VoteByRatingInput onVoted={(val: number) => handleVoted({ rating: val })} userVote={userVote?.rating} />
          <VoteCommentInput
            onCommented={(val: string) => handleVoted({ comment: val })}
            userComment={userVote?.comment}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: '1rem' }}>
        <Button onClick={() => onClose(true)}>terug</Button>
        <Button onClick={handleSaveAndClose} disabled={!voted || !voteHasChanged}>
          opslaan
        </Button>
      </DialogActions>
    </Dialog>
  );
}
