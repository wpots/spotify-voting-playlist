import "server-only";
import { authOptions } from "@/utils/authentication/authOptions";
import { getServerSession } from "next-auth";
import spotifyMapper from "./spotify.mapper";
import { IPlaylist } from "@domain/playlist";
import { PlaylistResponse } from "@spotify/webapi";

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
      if (!response?.ok) throw new Error("SPOTIFY SERVICE FETCH", { cause: response });
      return await response.json();
    } catch (error) {
      console.error(error, error.state.body);
      throw new Error("SPOTIFY SERVICE", { cause: error });
    }
  },
  async getPlaylistById(id: string): Promise<IPlaylist | undefined> {
    const response: PlaylistResponse = await this.useSpotifyFetch(`playlists/${id}`);
    if (response) return spotifyMapper.toDomain.parsePlaylist(response);
  },
  async getPlaylistsByBulk(ids: string[]): Promise<IPlaylist[] | undefined> {
    try {
      const bulkFetchRequest = ids.map(id => this.getPlaylistById(id));
      const playlists = await Promise.all(bulkFetchRequest);
      return playlists ?? undefined;
    } catch (error) {
      console.error(error);
    }
  },
};

export default SpotifyService;
