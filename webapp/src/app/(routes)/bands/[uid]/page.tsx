import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import FireStoreService from "@/utils/firebase/firebase.service";
import SpotifyService from "@/utils/spotify/spotify.service";
import Playlist from "@/app/_components/Playlist/Playlist";
import { Typography } from "@mui/material";

/**
 * Band Page where member can
 * add playlist
 * edit playlist
 * vote for songs in playlist
 *  - 5 star vote
 *  - veto vote
 *  - add comment
 * invite new members
 * revoke membership (with archive)
 *
 */
export default async function BandsPage() {
  const session = await getServerSession(authOptions);
  const bandId = session?.user?.memberships?.[0]; // hardcoded for now, TODO create list of bands
  if (session && bandId) {
    const band = await FireStoreService.getBandById(bandId);
    const playlistId = band?.playlists?.[0];
    const getPlaylist = playlistId ? await SpotifyService.getPlaylistById(playlistId) : false;
    {
      getPlaylist && <Playlist playlist={getPlaylist} />;
    }
    {
      !getPlaylist && (
        <Typography variant="h3" component="h3">
          {band.name} has no collaboration playlists yet!
        </Typography>
      );
    }
  } else {
    //redirect to login page
  }
}
