import { Vote } from '@firebase/api';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../_context/client-user-provider';
import { IBand, IPlaylist, ITrack, IUser, IVote, IVoteItem } from '@domain/content';

type UseVotingOptions = {
  votes?: any;
  add?: any;
  track?: ITrack;
  playlist?: IPlaylist;
};
export default function useVoting({ track, playlist, votes }: UseVotingOptions) {
  if (!UserContext) {
    throw new Error('React Context is unavailable in Server Components');
  }

  // if (!playlistId || !track || !votes) {
  //   throw new Error('You need to specify at least one of the following: playlistId, track, votes');
  // }

  const userContext = useContext(UserContext);

  const [currentPlaylist, setCurrentPlaylist] = useState<IPlaylist | undefined>(playlist);
  if (!votes && track) {
    votes = track.votes;
  }
  // console.log('no effect in voting');
  // useEffect(() => {
  //   console.log('empty array in voting');
  // }, []);
  // useEffect(() => {
  //   console.log('empty in voting');
  // });
  useEffect(() => {
    if (currentPlaylist) {
      console.log('playlist dependency in voting');
    }
  }, [currentPlaylist]);

  const userId = userContext?.userInfo.id;
  const userVote = parseInt(votes?.items.find((i: IVoteItem) => userId === i.userId)?.vote);

  const bandMembers = userContext?.currentBand?.members as IUser[];

  const extendedVoteMembers = bandMembers.map(member => {
    const voteByMember = votes?.items?.find((v: IVoteItem) => v.userId === member.id);
    return { ...member, vote: voteByMember?.vote };
  });

  const memberStats = {
    pending: votes?.items?.length === 0 ? bandMembers : extendedVoteMembers.filter(m => !m.vote),
    voted: extendedVoteMembers.filter(m => m.vote),
  };

  const sortPlaylistByPopularity = () => {};

  const refetchVotes = async () => {
    if (!currentPlaylist) throw Error('No playlist id specified!');
    const memberIds = bandMembers.map(m => m.id);
    const playlistIds = userContext?.currentBand?.playlists?.map(p => (p as IPlaylist).id);
    const queryString = new URLSearchParams({
      members: JSON.stringify(memberIds),
      playlists: JSON.stringify(playlistIds),
    });
    try {
      const response = await fetch(`/api/votes?${queryString}`);
      const updatedPlaylists = await response.json();
      console.log(updatedPlaylists);
    } catch (error) {
      console.error('USEVOTING getVotes', error);
    }
  };

  const setUserVote = async (trackId: string, vote: number) => {
    try {
      const response = await fetch(`/api/votes/${trackId}?vote=${vote}`, { method: 'POST' });
      console.log(response);
    } catch (error) {
      console.error('USEVOTING setVote', error);
    }
  };

  return { userVote, memberStats, setUserVote, refetchVotes, sortPlaylistByPopularity };
}
