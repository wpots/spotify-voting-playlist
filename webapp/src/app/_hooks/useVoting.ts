import type { Vote } from '@firebase/api';
import { useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { UserContext } from '../_context/client-user-provider';
import { IBand, IPlaylist, ITrack, IUser, IVote, IVoteItem } from '@domain/content';
import { useParams, useSearchParams } from 'next/navigation';
import votesMapper from '@/utils/votes/votes.mapper';
import * as Actions from '../_actions';

type UseVotingOptions = {
  playlist?: IPlaylist;
  votes?: any;
  track?: any;
};
export type FilteredPlaylist = {
  alles?: { title: string; tracks: ITrack[]; total: number };
  compleet?: { title: string; tracks: ITrack[]; total: number; exclude?: boolean };
  'stem!'?: { title: string; tracks: ITrack[]; total: number; exclude?: boolean };
  incompleet?: { title: string; tracks: ITrack[]; total: number; exclude?: boolean };
};

export default function useVoting({ playlist, votes, track }: UseVotingOptions) {
  if (!UserContext) {
    throw new Error('React Context is unavailable in Server Components');
  }

  console.log('RENDER USEVOTE');
  // side effects are tasks that do not impact render cycle:
  // example : sorting a list , not directly related to rendered JSX
  // infinite loop can occur when setting state.

  // you might not need useEffect()
  // synchronous calls
  // user input dependant code

  useEffect(() => {
    // componentDidMount dep: []
    // componentDidUpdate dep: <empty>
    // componentUnMounted return () =>{}
  });

  // CONTEXT DATA
  const userContext = useContext(UserContext);
  const userId = userContext?.userInfo.id;
  const params = useParams();
  const query = useSearchParams();
  const bandId = params.uid;

  if (!userId || !bandId) {
    throw Error('UseVoting is missing context');
  }

  const currentBand = userContext?.userBands?.find(b => b.id === bandId);

  // MEMBER DATA
  const findBandMemberVote = useCallback(
    (memberId: string, voteItems?: IVoteItem[]) => voteItems?.find((v: IVoteItem) => v.userId === memberId),
    []
  );
  const bandMembers = currentBand?.members as IUser[];

  const memberStats = (votes: IVote) => {
    const extendedVoteMembers = bandMembers?.map(member => {
      return { ...member, vote: findBandMemberVote(member.id, votes.items) };
    });

    return {
      pending: votes?.items?.length === 0 ? bandMembers : extendedVoteMembers?.filter(m => !m.vote?.rating),
      voted: extendedVoteMembers?.filter(m => m.vote?.rating),
      average: votes?.average ? +votes?.average : undefined,
      isVetod: votes?.veto && votes.veto.length > 0,
    };
  };

  // PLAYLIST DATA
  const playlistFromSearchUrl = currentBand?.playlists?.find(
    p => (p as IPlaylist).id === query.get('playlist')
  ) as IPlaylist;

  if (!playlist) {
    // if no manual playlist is added, default to querystring in url or just the 1st you can find if any
    playlist = playlistFromSearchUrl || (currentBand?.playlists?.[0] as IPlaylist);
  }

  if (!votes) {
    votes = track?.votes;
  }
  // technically playlist is not needed if hook is used per track decoupled from any list
  const [currentPlaylist, setCurrentPlaylist] = useState<IPlaylist | undefined>(playlist);

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
        bandMembers.every(member => findBandMemberVote(member.id, track.votes?.items))
      );
      const memberVotesPending = allTracks?.filter(track =>
        bandMembers.some(member => !findBandMemberVote(member.id, track.votes?.items))
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
  }, [userId, currentPlaylist, bandMembers, findBandMemberVote, sortPlaylistByPopularity]);

  const playlistFilters = useMemo(() => {
    return Object.keys(filterPlaylistBy).reduce((acc: string[], key) => {
      if (filterPlaylistBy[key as keyof FilteredPlaylist]?.tracks) {
        acc.push(key);
      }
      return acc;
    }, []);
  }, [filterPlaylistBy]);

  const userVote = useMemo(() => {
    return votes?.items.find((i: IVoteItem) => userId === i.userId);
  }, [votes, userId]);

  const fetchVotes = useCallback(async () => {
    if (!currentPlaylist) throw Error('No playlist id specified!');
    const memberIds = bandMembers.map(m => m.id);
    const list = structuredClone(currentPlaylist);

    const queryString = new URLSearchParams({
      members: JSON.stringify(memberIds),
      trackIds: JSON.stringify(list?.tracks?.refs),
    });
    try {
      const response = await fetch(`/api/votes?${queryString}`);
      const votes = await response.json();
      const updatedPlaylist = votesMapper.resolveVotesForPlaylistTracks(list as IPlaylist, votes);

      setCurrentPlaylist(updatedPlaylist);

      return updatedPlaylist;
    } catch (error) {
      console.error('USEVOTING getVotes', error);
    }
  }, [bandMembers, currentPlaylist]);

  const setUserVote = useCallback(async (trackId: string, vote: Pick<IVoteItem, 'comment' | 'rating'>) => {
    try {
      await Actions.setUserVote({ trackId, ...vote });
    } catch (error) {
      console.error('SET_USER_VOTE ERROR:', error);
    }
    // try {
    //   const response = await fetch(`/api/votes/${trackId}?vote=${vote}`, { method: 'POST' });
    //   const updatedVote = await response.json();
    //   return updatedVote;
    // } catch (error) {
    //   console.error('USEVOTING setVote', error);
    // }
  }, []);

  return {
    userVote,
    memberStats,
    setUserVote,
    fetchVotes,
    currentBand,
    currentPlaylist,
    filterPlaylistBy,
    playlistFilters,
    sortPlaylistByPopularity,
  };
}
