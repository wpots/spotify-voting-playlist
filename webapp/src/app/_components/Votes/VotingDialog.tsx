'use client';
import React, { useCallback, useState, useMemo } from 'react';
import type { ITrack, IUser } from '@domain/content';
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
import useVoting, { useVote } from './Votes.hook';
import VoteByRatingInput from './VoteRatingInput';
import VotingDetails from './VotingDetails';
import VoteCommentInput from './VoteCommentInput';
import TrackLink from '../Tracks/TrackLink';
import { useParams } from 'next/navigation';
import { useBandCollection } from '@/app/_hooks/useCollections';
interface VotingDialogProps {
  track: ITrack;
  open: boolean;
  voteStatistics?: any;
  onClose: (val: boolean) => void;
}

export default function VotingDialog({ track, open, onClose }: Readonly<VotingDialogProps>) {
  const [voted, setVoted] = useState<Record<string, any>>({ rating: null, comment: null });
  const { getMemberNameById } = useBandCollection();
  const params = useParams();
  const { myVote, setUserVote, suggestedByMember } = useVote(track);

  const isProxyVote = params.memberid as string;
  const proxyVoteFor = track.votes?.items?.find(v => v.userId === params.memberid);

  const setVoteFor = useMemo(() => (isProxyVote ? proxyVoteFor : myVote), [proxyVoteFor, myVote, isProxyVote]);

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

  const voteHasChanged = setVoteFor?.rating !== voted?.rating || setVoteFor?.comment !== voted?.comment;

  return (
    <Dialog open={open} onClose={() => onClose(true)}>
      <DialogTitle>
        {track?.name} - {track?.artists}
      </DialogTitle>

      <TrackLink title='luister op spotify' url={track.url} />
      <Divider />
      <VotingDetails details={track} />
      <Divider />
      <DialogContent dividers sx={{ border: isProxyVote ? '4px solid red' : null }}>
        <Typography variant='h6' sx={{ color: 'initial' }}>
          {isProxyVote ? getMemberNameById(isProxyVote) : 'jouw'} stem:
        </Typography>
        <DialogContentText>
          <VoteByRatingInput onVoted={(val: number) => handleVoted({ rating: val })} userVote={setVoteFor?.rating} />
          <VoteCommentInput
            onCommented={(val: string) => handleVoted({ comment: val })}
            userComment={setVoteFor?.comment}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: '1rem' }}>
        <Button onClick={() => onClose(true)}>terug</Button>
        <Button onClick={handleSaveAndClose} disabled={!voted || !voteHasChanged}>
          opslaan
        </Button>
      </DialogActions>
      <Divider />
      {suggestedByMember && (
        <Typography variant='caption' paddingInline={2} paddingBlock={1}>
          voorstel van: {suggestedByMember?.name}
        </Typography>
      )}
    </Dialog>
  );
}
