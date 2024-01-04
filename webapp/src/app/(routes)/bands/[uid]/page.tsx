import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authentication/authOptions";
import { notFound } from "next/navigation";
import * as FireStoreService from "@/utils/firebase/firebase.service";
import SpotifyService from "@/utils/spotify/spotify.service";

import type { IBand } from "@domain/band";

import { Typography, Box } from "@mui/material";
import PlaylistTabs from "@/app/_components/Playlist/PlaylistTabs";
import votesMapper from "@/utils/votes/votes.mapper";
import { IPlaylist, IVote } from "@domain/playlist";

interface BandPageProps {
  params: { uid: string };
}

export default async function BandPage({ params }: BandPageProps) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const bands = userId ? ((await FireStoreService.getBandsByUserId(userId)) as IBand[]) : undefined;
  const currentBand: IBand | undefined = bands?.find((band: IBand) => band.id === params.uid);
  if (!currentBand) return notFound();

  const playlists =
    currentBand.playlists?.length === 0 ? undefined : await SpotifyService.getPlaylistsByBulk(currentBand.playlists);
  let extendedPlaylists: IPlaylist[] = [];
  if (playlists) {
    for (const list of playlists) {
      const trackIds = list.tracks.refs;
      const votes = trackIds
        ? ((await FireStoreService.getVotesByBandMembers(currentBand.members, trackIds)) as IVote[])
        : undefined;
      if (votes) {
        const extendedList = votesMapper.resolveVotesForPlaylistTracks(list, votes);
        extendedPlaylists.push(extendedList);
      } else {
        extendedPlaylists.push(list);
      }
    }
  }
  if (playlists?.length === 0) return <Typography align="center">No Playlist for this band yet...</Typography>;
  return (
    <>
      <Typography component="h1" variant="h1">
        {currentBand.name}
      </Typography>
      {playlists && <PlaylistTabs playlists={playlists} />}
    </>
  );
}
