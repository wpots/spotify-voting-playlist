import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import spotifyMapper from "./spotify.mapper";

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
      if (!response?.ok) throw new Error("Something wrong", { cause: response });
      return await response.json();
    } catch (error) {
      console.error(error);
      throw new Error("oops", { cause: error });
    }
  },
  async getPlaylistById(id: string) {
    const response = await this.useSpotifyFetch(`playlists/${id}`);
    return spotifyMapper.toDomain.parsePlaylist(response);
  },
};

export default SpotifyService;
