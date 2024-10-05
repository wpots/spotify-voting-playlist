import { getServerSession } from '@/utils/authentication';
import { notFound, redirect } from 'next/navigation';
import * as ContentService from '@/utils/content/content.service';
import { Typography, Alert } from '@mui/material';
import PlaylistTabs from '@/app/_components/Playlist/PlaylistTabs';
import { IBand, IPlaylist } from '@domain/content';

import AppBanner from '@/app/_components/UI/AppBanner';

interface BandPageProps {
  params: { uid: string };
}

export default async function BandPage({ params }: BandPageProps) {
  const session = await getServerSession();

  if (!session) redirect('/signin?unauthenticated=true');

  const userId = session?.user?.id;
  let userBands: IBand[] | undefined;
  let currentBand: IBand | undefined;

  if (userId) {
    userBands = await ContentService.getBandsByUserId(userId);
    currentBand = userBands?.find(b => b.id === params.uid);
  }

  if (!currentBand) return notFound();
  if (currentBand.playlists?.length === 0)
    return <Typography align='center'>Er zijn geen playlists gevonden....</Typography>;

  if (currentBand.playlists?.some(el => (el as IPlaylist).error)) {
    const isNotCollaborator = currentBand.playlists?.find(el => (el as IPlaylist).error.status === 404);
    if (isNotCollaborator)
      return (
        <Alert severity='warning'> De playlist herkent jou nog niet, vraag een bandlid om de lijst te delen.</Alert>
      );
    return <Alert severity='error'>Er ging iets fout bij het ophalen van de playlists...</Alert>;
  }
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
      <AppBanner title={currentBand.name} avatar={currentBand?.logo} />

      {currentBand.error && (
        <Alert severity='error'>De playlists konden niet worden opgehaald, probeer het later opnieuw....</Alert>
      )}
      {currentBand.playlists && <PlaylistTabs playlists={currentBand?.playlists as IPlaylist[]} />}
    </>
  );
}
