import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authentication/authOptions';
import { notFound } from 'next/navigation';
import * as ContentService from '@/utils/content/content.service';
import { Typography, Alert } from '@mui/material';
import PlaylistTabs from '@/app/_components/Playlist/PlaylistTabs';
import { IBand, IPlaylist } from '@domain/content';

import { signIn } from 'next-auth/react';

interface BandPageProps {
  params: { uid: string };
}

export default async function BandPage({ params }: BandPageProps) {
  const session = await getServerSession(authOptions);
  if (session?.error === 'RefreshAccessTokenError') {
    signIn(); // Force sign in to hopefully resolve error
  }

  const userId = session?.user?.id;
  let userBands: IBand[] | undefined;
  let currentBand: IBand | undefined;

  if (userId) {
    userBands = await ContentService.getBandsByUserId(userId);
    currentBand = userBands?.find(b => b.id === params.uid);
  }

  if (!currentBand) return notFound();

  if (currentBand.playlists?.length === 0)
    return <Typography align="center">Er zijn geen playlists gevonden....</Typography>;
  // server side rendered playlists without votes
  /**
   * TODO:
   * create skeleton based on ids?
   *
   *
   * Do not overuse memo()
   * use high up component tree
   * DO NOT use where props change frequently (performance cost)
   */

  return (
    <>
      <Typography component="h1" variant="h2" sx={{ px: '1rem' }}>
        {currentBand.name}
      </Typography>
      {currentBand.error && (
        <Alert severity="error">De playlists konden niet worden opgehaald, probeer het later opnieuw....</Alert>
      )}
      {currentBand.playlists && <PlaylistTabs playlists={currentBand?.playlists as IPlaylist[]} />}
    </>
  );
}
