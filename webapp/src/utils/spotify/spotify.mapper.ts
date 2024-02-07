import type { IPlaylist, ITrack } from '@domain/content';
import type { PlaylistResponse } from '@spotify/webapi';

const spotifyMapper = {
  toDomain: {
    parsePlaylist(playlist: PlaylistResponse): IPlaylist | undefined {
      const mappedList = {
        ...playlist,
        url: playlist?.external_urls?.spotify,
        image: playlist.images?.[0].url,
        tracks: {
          ...playlist.tracks,
          refs: playlist.tracks?.items.map(i => i.track.id),
          items: playlist?.tracks?.items.map(item => ({
            ...item.track,
            added_by: item.added_by,
            artists: item.track.artists.map(artist => artist.name).toString(),
            url: item.track.external_urls?.spotify,
          })),
        },
      };
      return mappedList;
    },
  },
  fromDomain: {},
};

export default spotifyMapper;
