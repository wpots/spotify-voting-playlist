import { IPlaylist } from "@domain/playlist";
import { PlaylistResponse } from "@spotify/webapi";

const spotifyMapper = {
  toDomain: {
    parsePlaylist(playlist: PlaylistResponse): IPlaylist {
      const mappedList = {
        ...playlist,
        url: playlist.external_urls.spotify,
        tracks: {
          ...playlist.tracks,
          items: playlist?.tracks?.items.map(item => ({
            ...item.track,
            added_by: item.added_by,
            url: item.track.external_urls.spotify,
          })),
        },
      };
      return mappedList;
    },
  },
  fromDomain: {},
};

export default spotifyMapper;
