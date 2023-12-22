import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

import FireStoreService from "@/utils/firebase/firebase.service";
import SpotifyService from "@/utils/spotify/spotify.service";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const bandId = session?.user?.memberships?.[0];
  let band;
  if (bandId) {
    band = await FireStoreService.getBandById(bandId);
  }

  const playlistId = "3cEYpjA9oz9GiPac4AsH4n";
  const getPlaylist = await SpotifyService.getPlaylistById(playlistId);

  console.log(getPlaylist);

  if (!session) return <main>Your are not logged in....</main>;
  return (
    <main>
      <small>you are logged in</small>
      <p>your band: {band?.name}</p>
    </main>
  );
}
