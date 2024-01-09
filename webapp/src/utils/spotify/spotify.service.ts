import 'server-only';
import { authOptions } from '@/utils/authentication/authOptions';
import { getServerSession } from 'next-auth';
import spotifyMapper from './spotify.mapper';
import type { IPlaylist } from '@domain/content';
import type { PlaylistResponse } from '@spotify/webapi';
import { notFound } from 'next/navigation';

const playlistParams = {
  fields: `id,name,external_urls.spotify,tracks.items(added_by.id, track(id,name,href,artists(name),external_urls.spotify))`,
};

const SpotifyService = {
  async useSpotifyFetch(uri?: string, options?: any) {
    try {
      const session = await getServerSession(authOptions);
      const baseUrl = `https://api.spotify.com/v1`;
      const response = await fetch(`${baseUrl}/${uri}`, {
        headers: { Authorization: `Bearer ${session?.token}` },
      });
      if (!response?.ok) throw new Error('SPOTIFY SERVICE FETCH', { cause: response });
      // if (response?.statusText === 'UND_ERR_CONNECT_TIMEOUT') return notFound();
      return await response.json();
    } catch (error: any) {
      console.error(error?.cause?.code);
      // return notFound();
      // throw new Error('SPOTIFY SERVICE', { cause: error });
    }
  },
  async getPlaylistById(id: string): Promise<IPlaylist | undefined> {
    const response: PlaylistResponse = await this.useSpotifyFetch(`playlists/${id}`);
    if (response) return spotifyMapper.toDomain.parsePlaylist(response);
  },
  async getPlaylistsByBulk(ids: string[]): Promise<IPlaylist[] | undefined> {
    const bulkFetchRequest = ids.map(id => this.getPlaylistById(id));
    const playlists = (await Promise.all<IPlaylist | undefined>(bulkFetchRequest)) as IPlaylist[];
    return playlists;
  },
};

export default SpotifyService;
