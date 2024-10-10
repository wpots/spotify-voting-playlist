import { useMemo, useCallback } from 'react';
import { ITrack, IVoteItem } from '@domain/content';
import { useParams } from 'next/navigation';

import { useBandCollection } from '../../_hooks/useCollections';
import { useAuthentication } from '@/utils/authentication/ui';
import { setTrackVote } from './Votes.action';

export function useVote(track: ITrack) {
  const { members } = useBandCollection();
  const { auth } = useAuthentication();
  const params = useParams();
  const userId = auth?.user?.uid;
  const votes = track.votes;

  const suggestedByMember = members.find(m => m.id === track?.added_by.id);

  const myVote = useMemo(() => {
    return votes?.items.find((i: IVoteItem) => userId === i.userId);
  }, [votes, userId]);

  const setUserVote = useCallback(
    async (trackId: string, vote: Pick<IVoteItem, 'comment' | 'rating'>) => {
      const voteFor = params.memberid as string;
      try {
        await setTrackVote({ trackId, ...vote }, voteFor);
      } catch (error) {
        console.error('SET_USER_VOTE ERROR:', error);
      }
    },
    [params]
  );

  return {
    myVote,
    setUserVote,
    suggestedByMember,
  };
}
