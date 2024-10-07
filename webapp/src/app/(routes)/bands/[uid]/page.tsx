import { Typography, Alert } from '@mui/material';
import { IPlaylist } from '@domain/content';
import AppBanner from '@/app/_components/UI/AppBanner';
import PlaylistTabs from '@/app/_components/Playlist/PlaylistTabs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAuthSession } from '@/utils/authentication/firebase.provider';
import { getContentByUserId } from '@/utils/content';

interface BandPageProps {
  params: { uid: string };
}

export default async function BandPage({ params }: BandPageProps) {
  const session = await getAuthSession(cookies());
  if (!session) redirect(`/signin?unauthenticated=true&returnTo=/bands/${params.uid}`);

  const { myBands } = await getContentByUserId(session?.uid);
  const currentBand = myBands?.find(b => b.id === params.uid);

  if (!currentBand) return <Alert severity='error'>Deze band staat niet in jouw lijst...</Alert>;

  if (!currentBand.playlists || currentBand.playlists?.length === 0)
    return <Typography align='center'>Er zijn geen playlists gevonden....</Typography>;

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
      <AppBanner title={currentBand.name} avatar={currentBand?.logo} />

      {currentBand.error && (
        <Alert severity='error'>De playlists konden niet worden opgehaald, probeer het later opnieuw....</Alert>
      )}
      {currentBand.playlists && <PlaylistTabs playlists={currentBand?.playlists as IPlaylist[]} />}
    </>
  );
}
