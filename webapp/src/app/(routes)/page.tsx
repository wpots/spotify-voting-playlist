import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

import FireStoreService from "@/utils/firebase/firebase.service";
import SpotifyService from "@/utils/spotify/spotify.service";
import Playlist from "../_components/Playlist/Playlist";
import LogoutButton from "../_components/Auth/LogoutButton";

export default async function Home() {
  const session = await getServerSession(authOptions);
  // TODO add refresh flow
  const bandId = session?.user?.memberships?.[0];
  let band;
  let playlistId;
  let playlist;
  if (bandId) {
    band = await FireStoreService.getBandById(bandId);
    playlistId = band?.playlists[0]; // hardcoded for now
  }

  if (playlistId) {
    try {
      playlist = await SpotifyService.getPlaylistById(playlistId);
    } catch (error) {
      console.log(error);
    }
  }

  if (!session) return <main>Your are not logged in....</main>;
  return (
    <main>
      <small>you are logged in</small>
      <h2>Hi {session.user.name}</h2>
      <p>your band: {band?.name}</p>
      {playlist && <Playlist playlist={playlist} />}
      <LogoutButton>Log out</LogoutButton>
    </main>
  );
}
