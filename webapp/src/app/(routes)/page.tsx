import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authentication/authOptions";

import * as FireStoreService from "@/utils/firebase/firebase.service";
import SpotifyService from "@/utils/spotify/spotify.service";
import Playlist from "../_components/Playlist/Playlist";
import LogoutButton from "../_components/Auth/LogoutButton";
import { IBand } from "@domain/band";
import { redirect } from "next/navigation";
import BandTeaser from "../_components/Band/BandTeaser";
import BandMembers from "../_components/Band/BandMembers";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const bands = userId && ((await FireStoreService.getBandsByUserId(userId)) as IBand[]);
  const errorMessage = !session?.user
    ? "You are not logged in."
    : bands?.length === 0
    ? "You are not set up to collaborate yet."
    : false;
  if (bands?.length === 1) redirect(`/bands/${bands[0].id}`);
  return (
    <main>
      <h2>Hi {session?.user?.name}</h2>
      <p>your bands: {bands?.map(band => band.name).toString()}</p>
      {bands.map(band => (
        <BandTeaser></BandTeaser>
      ))}

      <LogoutButton>Log out</LogoutButton>
    </main>
  );
}
