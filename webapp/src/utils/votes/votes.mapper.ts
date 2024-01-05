import { IPlaylist, IVote } from "@domain/playlist";
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
      array.unshift(array.slice(currentUserIdx, 1)[0]);
    }
  },
};

export default votesMapper;
