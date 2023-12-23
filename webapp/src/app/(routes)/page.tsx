import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

import FireStoreService from "@/utils/firebase/firebase.service";
import SpotifyService from "@/utils/spotify/spotify.service";
import Playlist from "../_components/Playlist/Playlist";

export default async function Home() {
  const session = await getServerSession(authOptions);
  // TODO add refresh flow
  const bandId = session?.user?.memberships?.[0];
  let band;
  if (bandId) {
    band = await FireStoreService.getBandById(bandId);
  }

  const playlistId = "6F9aPJmG7lCIyz38NSA33q";
  const getPlaylist = await SpotifyService.getPlaylistById(playlistId);
  if (!session) return <main>Your are not logged in....</main>;
  return (
    <main>
      <small>you are logged in</small>
      <p>your band: {band?.name}</p>
      {<Playlist playlist={getPlaylist} />}
    </main>
  );
}
