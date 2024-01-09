import { Vote } from '@firebase/api';
import { useContext } from 'react';
import { UserContext } from '../_context/client-user-provider';
import { IBand, IPlaylist, ITrack, IUser, IVote, IVoteItem } from '@domain/content';

type UseVotingOptions = {
  votes?: any;
  add?: any;
  track?: ITrack;
  playlistId?: string;
};
export default function useVoting({ track, playlistId, votes }: UseVotingOptions) {
  if (!UserContext) {
    throw new Error('React Context is unavailable in Server Components');
  }

  // if (!playlistId || !track || !votes) {
  //   throw new Error('You need to specify at least one of the following: playlistId, track, votes');
  // }

  const userContext = useContext(UserContext);

  const userId = userContext?.userInfo.id;
  const userVote = votes?.items.find((i: IVoteItem) => userId === i.userId);

  const bandMembers = userContext?.currentBand?.members as IUser[];
  const currentPlaylist: IPlaylist | undefined = playlistId
    ? (userContext?.currentBand?.playlists?.find(p => (p as IPlaylist).id === playlistId) as IPlaylist)
    : undefined;

  if (!votes && track) {
    votes = track.votes;
  }

  // const extendedVotes = votes?.items?.map(vote => {
  //   const voteByMember = bandMembers.find(m => m.id === vote.userId);
  //   return { ...vote, member: voteByMember };
  // });

  const extendedVoteMembers = bandMembers.map(member => {
    const voteByMember = votes?.items?.find(v => v.userId === member.id);
    return { ...member, vote: voteByMember };
  });

  const memberStats = {
    pending: votes?.items?.length === 0 ? bandMembers : extendedVoteMembers.filter(m => !m.vote),
    voted: extendedVoteMembers.filter(m => m.vote),
  };

  const setVote = (vote: IVoteItem) => {
    console.log(vote);
  };

  return { userVote, memberStats, setVote };
}
