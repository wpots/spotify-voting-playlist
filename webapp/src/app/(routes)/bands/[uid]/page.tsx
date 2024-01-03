import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authentication/authOptions";

import * as FireStoreService from "@/utils/firebase/firebase.service";
import SpotifyService from "@/utils/spotify/spotify.service";
import Playlist from "@/app/_components/Playlist/Playlist";
import type { IBand } from "@domain/band";
import { ITrack } from "@domain/playlist";

interface BandPageProps {
  params: { uid: string };
}

export default async function BandPage({ params }: BandPageProps) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const bands = userId && ((await FireStoreService.getBandsByUserId(userId)) as IBand[]);
  const currentBand = bands?.find((band: IBand) => band.id === params.uid);

  const playlists = currentBand.playlists && (await SpotifyService.getPlaylistById(currentBand.playlists[0]));
  const trackIds = playlists?.[0]?.tracks.items.map((i: ITrack) => i.id);
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
