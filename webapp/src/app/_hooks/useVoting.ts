import { useContext } from 'react';
import { UserContext } from '../_context/client-user-provider';
import { IBand, IPlaylist, ITrack, IUser, IVote } from '@domain/content';

type UseVotingOptions = {
  votes: any;
  add?: any;
  trackId?: string;
  playlistId?: string;
};
export default function useVoting({ trackId, playlistId, votes }: UseVotingOptions) {
  if (!UserContext) {
    throw new Error('React Context is unavailable in Server Components');
  }

  const userContext = useContext(UserContext);
  const userId = userContext?.userInfo.id;
  const bandMembers = userContext?.currentBand?.members as IUser[];
  const userVote = votes?.items.find(i => userId === i.userId);

  const memberStats = {
    pending:
      votes?.items.length === 0 ? bandMembers : bandMembers?.filter(m => !votes?.items.some(i => i.userId === m.id)),
    voted: bandMembers?.filter(m => votes?.items.some(i => i.userId === m.id)),
  };

  const setVote = vote => {
    console.log(vote);
  };

  return { userVote, memberStats, setVote };
}
