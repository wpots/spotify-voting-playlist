import { useCallback } from 'react';
import { ITrack, IVoteItem } from '@domain/content';

import { useBandCollection } from '@/app/_hooks/useCollections';

export function useTrack(track: ITrack) {
  const { members } = useBandCollection();
  const votes = track.votes;

  const findBandMemberVote = useCallback(
    (memberId: string, voteItems?: IVoteItem[]) => voteItems?.find((v: IVoteItem) => v.userId === memberId),
    []
  );

  const blockedByVeto = track.votes?.veto && track.votes.veto?.length > 0;

  const extendedVoteMembers = members?.map(member => {
    return { ...member, vote: findBandMemberVote(member.id, votes?.items) };
  });
  const voteStatistics = {
    pending: votes?.items?.length === 0 ? members : extendedVoteMembers?.filter(m => !m.vote?.rating),
    voted: extendedVoteMembers?.filter(m => m.vote?.rating),
    average: votes?.average ? +votes?.average : undefined,
    isVetod: votes?.veto && votes.veto.length > 0,
  };

  return {
    blockedByVeto,
    voteStatistics,
  };
}
