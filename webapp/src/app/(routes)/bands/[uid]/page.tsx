import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authentication/authOptions';
import { notFound } from 'next/navigation';
import * as ContentService from '@/utils/content/content.service';

import { Typography, Box } from '@mui/material';
import PlaylistTabs from '@/app/_components/Playlist/PlaylistTabs';

import UserContextProvider from '@/app/_context/client-user-provider';
import { IBand, IPlaylist } from '@domain/content';

interface BandPageProps {
  params: { uid: string };
}

export default async function BandPage({ params }: BandPageProps) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const currentBand: IBand | undefined = userId
    ? ((await ContentService.getCurrentBand(params.uid)) as IBand)
    : undefined;

  if (!currentBand) return notFound();

  const userProfile = {
    userInfo: session?.user,
    currentBand,
  };
  if (currentBand.playlists?.length === 0)
    return <Typography align="center">No Playlist for this band yet...</Typography>;

  return (
    <UserContextProvider userProfile={userProfile}>
      <Typography component="h1" variant="h1">
        {currentBand.name}
      </Typography>
      {currentBand.playlists && <PlaylistTabs playlists={currentBand.playlists as IPlaylist[]} />}
    </UserContextProvider>
  );
}
