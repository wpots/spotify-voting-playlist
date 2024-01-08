import { IPlaylist, IVote } from '@domain/content';
const votesMapper = {
  resolveVotesForPlaylistTracks(playlist: IPlaylist, votes?: IVote[]) {
    return {
      ...playlist,
      tracks: {
        items: playlist.tracks.items.map(item => {
          return {
            ...item,
            votes: votes?.filter(vote => vote.trackId === item?.id),
          };
        }),
      },
    };
  },
  unshiftCurrentUser(currentUser: string, array?: string[]) {
    if (array?.some(i => i === currentUser)) {
      const currentUserIdx = array.indexOf(currentUser);
      const userInArray = array.splice(currentUserIdx, 1);
      array.unshift(userInArray[0]);
    }
  },
};

export default votesMapper;
