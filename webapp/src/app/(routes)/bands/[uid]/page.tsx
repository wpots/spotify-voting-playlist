'use client';
import { Typography, Alert } from '@mui/material';
import { IPlaylist } from '@domain/content';
import AppBanner from '@/app/_components/UI/AppBanner';
import PlaylistTabs from '@/app/_components/Playlist/PlaylistTabs';
import { useAuthentication } from '@/utils/authentication/ui';
import { useRouter } from 'next/navigation';
import { useBandCollection } from '@/app/_hooks/useCollections';
import { useEffect } from 'react';
import { CollectionsService } from '@/utils/collections';

interface BandPageProps {
  params: { uid: string };
}
export default function BandPage({ params }: BandPageProps) {
  const { auth } = useAuthentication();
  const router = useRouter();
  if (!auth) router.push(`/signin?unauthenticated=true&returnTo=${params.uid}`);
  const { currentBand } = useBandCollection();

  if (!currentBand)
    return (
      <AppBanner
        title='Niet gevonden...'
        subTitle={`we konden geen match vinden tussen jou en band met kenmerk '${params.uid}'`}
      />
    );

  if (!currentBand.playlists || currentBand.playlists?.length === 0)
    return <Alert severity='error'>Deze band heeft nog geen playlists gekoppelt ... </Alert>;

  if (currentBand.playlists?.some(el => (el as IPlaylist).error)) {
    const isNotCollaborator = currentBand.playlists?.find(el => (el as IPlaylist).error.status === 404);

    if (isNotCollaborator)
      return (
        <Alert severity='warning'> De playlist herkent jou nog niet, vraag een bandlid om de lijst te delen.</Alert>
      );

    return <Alert severity='error'>Er ging iets fout bij het ophalen van de playlists...</Alert>;
  }

  return (
    <>
      <AppBanner title={currentBand?.name} avatar={currentBand?.logo} />

      {currentBand?.error && (
        <Alert severity='error'>De playlists konden niet worden opgehaald, probeer het later opnieuw....</Alert>
      )}
      {currentBand?.playlists && <PlaylistTabs playlists={currentBand?.playlists} />}
    </>
  );
}

// export async function generateStaticParams() {
//   const bandIds = await CollectionsService.getBandIds();
//   return bandIds.map(band => ({ uid: band.id }));
// }
