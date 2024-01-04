import { IPlaylist, ITrack } from "@domain/playlist";
import { PlaylistResponse } from "@spotify/webapi";

const spotifyMapper = {
  toDomain: {
    parsePlaylist(playlist: PlaylistResponse): IPlaylist {
      const mappedList = {
        ...playlist,
        url: playlist?.external_urls.spotify,
        image: playlist.images[0].url,
        tracks: {
          ...playlist.tracks,
          refs: playlist.tracks.items.map(i => i.track.id),
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
