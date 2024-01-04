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
};

export default votesMapper;
