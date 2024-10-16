import 'server-only';
import spotifyMapper from './spotify.mapper';
import type { IPlaylist, IError } from '@domain/content';
import type { PlaylistResponse } from '@spotify/webapi';

const SpotifyService = {
  async getAccessToken() {
    const baseUrl = 'https://accounts.spotify.com/api/token';
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const token = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const response = await fetch(baseUrl, {
      method: 'POST',
      body: new URLSearchParams({
        grant_type: 'client_credentials',
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${token}`,
      },
    });

    const result = await response.json();

    return result.access_token;
  },
  async useSpotifyFetch(uri?: string, options?: any) {
    try {
      const sessionToken = await this.getAccessToken();
      if (!sessionToken) return { error: { name: 'SPOTIFY_SERVICE_AUTH', status: 401, message: 'Unauthorized' } };
      const baseUrl = `https://api.spotify.com/v1`;
      const response = await fetch(`${baseUrl}/${uri}`, {
        headers: { Authorization: `Bearer ${sessionToken}` },
      });

      if (!response?.ok) return { error: response };

      return await response.json();
    } catch (error: any) {
      return {
        error,
      };
    }
  },
  async getPlaylistById(id: string): Promise<IPlaylist | IError | undefined> {
    const response: PlaylistResponse = await this.useSpotifyFetch(`playlists/${id}`);
    if (response.error) Promise.reject(response);
    return spotifyMapper.toDomain.parsePlaylist(response);
  },

  async getPlaylistsByBulk(ids: string[]): Promise<IPlaylist[] | IError[] | undefined> {
    const bulkFetchRequest = ids.map(id => this.getPlaylistById(id));
    return (await Promise.all<IPlaylist | IError | undefined>(bulkFetchRequest)) as IPlaylist[];
  },
};

export default SpotifyService;
