import "server-only";
import { authOptions } from "@/utils/authentication/authOptions";
import { getServerSession } from "next-auth";
import spotifyMapper from "./spotify.mapper";
import type { IPlaylist } from "@domain/content";
import type { PlaylistResponse } from "@spotify/webapi";

const SpotifyService = {
  async useSpotifyFetch(uri?: string, options?: any) {
    const session = await getServerSession(authOptions);
    if (!session) return { error: { name: "SPOTIFY_SERVICE_AUTH", status: 401, message: "Unauthorized" } };
    try {
      const baseUrl = `https://api.spotify.com/v1`;
      const response = await fetch(`${baseUrl}/${uri}`, {
        headers: { Authorization: `Bearer ${session?.token}` },
      });

      if (!response?.ok) return { error: response };

      return await response.json();
    } catch (error: any) {
      return {
        error,
      };
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
