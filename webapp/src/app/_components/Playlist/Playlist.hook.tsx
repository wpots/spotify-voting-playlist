import { useState, useMemo, useCallback } from 'react';
import { IPlaylist, ITrack, IVoteItem } from '@domain/content';

import { useAuthentication } from '@/utils/authentication/ui';
import { useBandCollection } from '@/app/_hooks/useCollections';

import { fetchPlaylistWithVotes } from './Playlist.action';

export type FilteredPlaylist = {
  alles?: { title: string; tracks: ITrack[]; total: number };
  compleet?: { title: string; tracks: ITrack[]; total: number; exclude?: boolean };
  'stem!'?: { title: string; tracks: ITrack[]; total: number; exclude?: boolean };
  incompleet?: { title: string; tracks: ITrack[]; total: number; exclude?: boolean };
};

export default function usePlaylist(playlist?: IPlaylist) {
  const [isReady, setIsReady] = useState(false);
  const { currentBand, members } = useBandCollection();
  const { auth } = useAuthentication();
  const userId = auth?.user?.uid;

  const [currentPlaylist, setCurrentPlaylist] = useState<IPlaylist | undefined>(playlist);

  const isVotableList = !currentPlaylist?.name.toUpperCase().includes('REPERTOIRE');

  const findBandMemberVote = useCallback(
    (memberId: string, voteItems?: IVoteItem[]) => voteItems?.find((v: IVoteItem) => v.userId === memberId),
    []
  );

  const sortPlaylistByPopularity = useCallback((tracks: ITrack[]) => {
    return tracks?.toSorted((a, b) => {
      // no votes. move to bottom
      if (!a.votes?.total || !b.votes?.total) return 1;
      // same vote count, which has higher average?
      if (a.votes.total === b.votes.total) {
        if (a.votes.average > b.votes.average) {
          return -1;
        } else {
          return 1;
        }
      }
      if (a.votes.total > b.votes.total) {
        return -1;
      } else if (a.votes.total < b.votes.total) {
        return 1;
      }
      return 0;
    });
  }, []);

  const filterPlaylistBy: FilteredPlaylist = useMemo(() => {
    const allTracks = currentPlaylist?.tracks.items;

    if (allTracks && allTracks.length > 0) {
      const allMembersVotes = allTracks?.filter(track =>
        members.every(member => findBandMemberVote(member.id, track.votes?.items))
      );
      const memberVotesPending = allTracks?.filter(track =>
        members.some(member => !findBandMemberVote(member.id, track.votes?.items))
      );
      const currentUserVotePending = allTracks?.filter(track => !findBandMemberVote(userId, track.votes?.items));
      return {
        compleet:
          allMembersVotes.length > 0
            ? {
                title: 'verkiesbaar/compleet',
                tracks: sortPlaylistByPopularity(allMembersVotes),
                total: allMembersVotes.length,
              }
            : undefined,
        incompleet:
          memberVotesPending.length > 0
            ? {
                title: 'in afwachting',
                tracks: sortPlaylistByPopularity(memberVotesPending),
                total: memberVotesPending.length,
              }
            : undefined,
        'stem!':
          currentUserVotePending.length > 0
            ? {
                title: 'stem nu!',
                tracks: sortPlaylistByPopularity(currentUserVotePending),
                total: currentUserVotePending.length,
                exclude: true,
              }
            : undefined,
        alles: { title: 'alle', tracks: sortPlaylistByPopularity(allTracks), total: allTracks.length },
      };
    }
    return {};
  }, [userId, currentPlaylist, members, findBandMemberVote, sortPlaylistByPopularity]);

  const playlistFilters = useMemo(() => {
    return Object.keys(filterPlaylistBy).reduce((acc: string[], key) => {
      if (filterPlaylistBy[key as keyof FilteredPlaylist]?.tracks) {
        acc.push(key);
      }
      return acc;
    }, []);
  }, [filterPlaylistBy]);

  const fetchVotes = useCallback(async () => {
    try {
      const list = structuredClone(currentPlaylist);
      const updatedPlaylist = list ? await fetchPlaylistWithVotes(list, members) : null;
      if (updatedPlaylist !== list) setCurrentPlaylist(updatedPlaylist as IPlaylist);
      setIsReady(true);
    } catch (error) {
      console.error('[USEVOTING]', error);
    }
  }, [currentBand, currentPlaylist]);

  return {
    fetchVotes,
    isReady,
    isVotableList,
    currentPlaylist,
    playlistFilters,
    filterPlaylistBy,
  };
}
