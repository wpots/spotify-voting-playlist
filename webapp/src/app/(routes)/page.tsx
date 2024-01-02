import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

import FireStoreService from "@/utils/firebase/firebase.service";
import SpotifyService from "@/utils/spotify/spotify.service";
import Playlist from "../_components/Playlist/Playlist";
import LogoutButton from "../_components/Auth/LogoutButton";
import { IBand } from "@domain/band";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  // TODO add refresh flow
  const bands = userId && ((await FireStoreService.getBandsByUserId(userId)) as IBand[]);

  if (!userId) return <main>You are currently not logged in</main>;
  if (bands?.length === 0) return <main>You do not seem to be granted acces to a collaborative Spotify Playlist</main>;
  return (
    <main>
      <h2>Hi {session?.user?.name}</h2>
      <p>your bands: {bands?.map(band => band.name).toString()}</p>

      <LogoutButton>Log out</LogoutButton>
    </main>
  );
}
