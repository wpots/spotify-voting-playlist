import { Vote } from '@firebase/api';
import { useContext, useEffect, useState, useMemo } from 'react';
import { UserContext } from '../_context/client-user-provider';
import { IBand, IPlaylist, ITrack, IUser, IVoteItem } from '@domain/content';
import { useParams, useSearchParams } from 'next/navigation';
import votesMapper from '@/utils/votes/votes.mapper';

type UseVotingOptions = {
  playlist?: IPlaylist;
  votes?: any;
  track?: any;
};

export default function useVoting({ playlist, votes, track }: UseVotingOptions) {
  if (!UserContext) {
    throw new Error('React Context is unavailable in Server Components');
  }

  const userContext = useContext(UserContext);
  const userId = userContext?.userInfo.id;
  const params = useParams();
  const query = useSearchParams();
  const bandId = params.uid;

  if (!userId || !bandId) {
    throw Error('UseVoting is missing context');
  }

  const currentBand = userContext?.userBands?.find(b => b.id === bandId);

  if (!playlist) {
    playlist = currentBand?.playlists?.find(p => (p as IPlaylist).id === query.get('playlist')) as IPlaylist;
  }

  const [currentPlaylist, setCurrentPlaylist] = useState<IPlaylist | undefined>(playlist);

  if (!votes) {
    votes = track?.votes;
  }

  const userVote = useMemo(
    () => parseInt(votes?.items.find((i: IVoteItem) => userId === i.userId)?.vote),
    [votes, userId]
  );

  const bandMembers = currentBand?.members as IUser[];

  const extendedVoteMembers = useMemo(
    () =>
      bandMembers?.map(member => {
        const voteByMember = votes?.items?.find((v: IVoteItem) => v.userId === member.id);
        return { ...member, vote: voteByMember?.vote };
      }),
    [votes, bandMembers]
  );

  const memberStats = useMemo(
    () => ({
      pending: votes?.items?.length === 0 ? bandMembers : extendedVoteMembers?.filter(m => !m.vote),
      voted: extendedVoteMembers?.filter(m => m.vote),
    }),
    [extendedVoteMembers, bandMembers, votes]
  );

  const sortPlaylistByPopularity = useMemo(() => {
    currentPlaylist?.tracks.items
      .sort((a, b) => {
        // no votes. move to bottom
        if (!a.votes?.total || !b.votes?.total) return 1;
        if (a.votes.total > b.votes.total) {
          return -1;
        } else if (a.votes.total < b.votes.total) {
          return 1;
        }
        return 0;
      })
      .sort((a, b) => {
        if (!a.votes || !b.votes) return 1;
        if (a.votes.average > b.votes.average) {
          return -1;
        } else if (a.votes.average < b.votes.average) {
          return 1;
        }
        return 0;
      });
  }, [currentPlaylist]);

  const fetchVotes = async () => {
    if (!currentPlaylist) throw Error('No playlist id specified!');
    const memberIds = bandMembers.map(m => m.id);
    const list = playlist ?? (currentBand?.playlists?.find(p => (p as IPlaylist).id) as IPlaylist);

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
  };

  const setUserVote = async (trackId: string, vote: number) => {
    try {
      const response = await fetch(`/api/votes/${trackId}?vote=${vote}`, { method: 'POST' });
      const updatedVote = await response.json();
      return updatedVote;
    } catch (error) {
      console.error('USEVOTING setVote', error);
    }
  };

  return {
    userVote,
    memberStats,
    setUserVote,
    fetchVotes,
    currentBand,
    currentPlaylist,
    sortPlaylistByPopularity,
  };
}
