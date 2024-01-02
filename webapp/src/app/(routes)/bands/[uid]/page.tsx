import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import FireStoreService from "@/utils/firebase/firebase.service";
import SpotifyService from "@/utils/spotify/spotify.service";
import Playlist from "@/app/_components/Playlist/Playlist";
import { IBand } from "@domain/band";

export default async function BandPage({ band }: { band: IBand }) {
  const session = await getServerSession(authOptions);
  const playlists = band.playlists && (await SpotifyService.getPlaylistById(band.playlists[0]));
  const trackIds = playlists?.[0]?.tracks.items.map(i => i.id);
  const votes = trackIds ? await FireStoreService.getVotesByBandMembers(band.members, trackIds) : [];
  const playlist = {
    ...playlists?.[0],
    tracks: {
      items: playlists?.[0]?.tracks.items.map(item => {
        return {
          ...item,
          votes: votes?.filter(vote => vote.trackId === item.id),
        };
      }),
    },
  };
  return playlist && <Playlist playlist={playlist} />;
}
