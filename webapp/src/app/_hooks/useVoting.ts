import type { Vote } from '@firebase/api';
import { useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { UserContext } from '../_context/client-user-provider';
import { IBand, IPlaylist, ITrack, IUser, IVoteItem } from '@domain/content';
import { useParams, useSearchParams } from 'next/navigation';
import votesMapper from '@/utils/votes/votes.mapper';
import * as Actions from '../_actions';

type UseVotingOptions = {
  playlist?: IPlaylist;
  votes?: any;
  track?: any;
};
export type FilteredPlaylist = {
  alles: { title: string; tracks: () => ITrack[] };
  compleet: { title: string; tracks: () => ITrack[] };
  pendingUserVote: { title: string; tracks: () => ITrack[] };
  incompleet: { title: string; tracks: () => ITrack[] };
};

export default function useVoting({ playlist, votes, track }: UseVotingOptions) {
  if (!UserContext) {
    throw new Error('React Context is unavailable in Server Components');
  }

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

  const extendedVoteMembers = useMemo(
    () =>
      bandMembers?.map(member => {
        return { ...member, vote: findBandMemberVote(member.id, votes?.items) };
      }),
    [votes, bandMembers, findBandMemberVote]
  );

  const memberStats = useMemo(
    () => ({
      pending: votes?.items?.length === 0 ? bandMembers : extendedVoteMembers?.filter(m => !m.vote?.rating),
      voted: extendedVoteMembers?.filter(m => m.vote?.rating),
    }),
    [extendedVoteMembers, bandMembers, votes]
  );

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

  const sortPlaylistByPopularity = (tracks: ITrack[]) => {
    return tracks?.sort((a, b) => {
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
  };

  const filterPlaylistBy: FilteredPlaylist = useMemo(() => {
    const allTracks = currentPlaylist?.tracks.items;

    return {
      compleet: {
        title: 'verkiesbaar/compleet',
        tracks: () =>
          allTracks?.filter(track => bandMembers.every(member => findBandMemberVote(member.id, track.votes?.items))),
      },
      pendingUserVote: {
        title: 'stem nu!',
        tracks: () => allTracks?.filter(track => !findBandMemberVote(userId, track.votes?.items)),
      },
      incompleet: {
        title: 'in afwachting',
        tracks: () =>
          allTracks?.filter(track => bandMembers.some(member => !findBandMemberVote(member.id, track.votes?.items))),
      },
      alles: { title: 'alle', tracks: () => allTracks },
    };
  }, [userId, currentPlaylist, bandMembers, findBandMemberVote]);

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
    sortPlaylistByPopularity,
  };
}
