import { PlaylistResponse } from "@spotify/webapi";

const spotifyMapper = {
  toDomain: {
    parsePlaylist: (playlist: PlaylistResponse) => {
      const mappedList = {
        ...playlist,
        tracks: {
          items: playlist?.tracks?.items.map(item => ({ ...item.track, added_by: item.added_by })),
        },
      };
      return mappedList;
    },
  },
  fromDomain: {},
};

export default spotifyMapper;
