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

  // PLAYLIST DATA
  if (!playlist) {
    // if no manual playlist is added, default to querystring in url
    playlist = currentBand?.playlists?.find(p => (p as IPlaylist).id === query.get('playlist')) as IPlaylist;
  }

  if (!votes) {
    votes = track?.votes;
  }
  // technically playlist is not needed if hook is used per track decoupled from any list
  const [currentPlaylist, setCurrentPlaylist] = useState<IPlaylist | undefined>(playlist);

  const currentTracks = currentPlaylist?.tracks.items;

  const sortPlaylistByPopularity = useMemo(() => {
    currentTracks?.sort((a, b) => {
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
  }, [currentTracks]);

  const userVote = useMemo(() => {
    return votes?.items.find((i: IVoteItem) => userId === i.userId);
  }, [votes, userId]);

  const sortedPlaylistBy = useMemo(() => {
    return {
      pendingUserVote: currentTracks?.filter(track => {
        return !track.votes || !track.votes?.items.find(i => i.userId === userId);
      }),
    };
  }, [userId, currentTracks]);

  const bandMembers = currentBand?.members as IUser[];

  const extendedVoteMembers = useMemo(
    () =>
      bandMembers?.map(member => {
        const voteByMember = votes?.items?.find((v: IVoteItem) => v.userId === member.id);
        return { ...member, vote: voteByMember };
      }),
    [votes, bandMembers]
  );

  const memberStats = useMemo(
    () => ({
      pending: votes?.items?.length === 0 ? bandMembers : extendedVoteMembers?.filter(m => !m.vote?.rating),
      voted: extendedVoteMembers?.filter(m => m.vote?.rating),
    }),
    [extendedVoteMembers, bandMembers, votes]
  );

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
    currentTracks,
    sortedPlaylistBy,
    sortPlaylistByPopularity,
  };
}
