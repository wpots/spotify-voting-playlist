import { Alert } from '@mui/material';
import { IPlaylist } from '@domain/content';
import AppBanner from '@/app/_components/UI/AppBanner';
import PlaylistTabs from '@/app/_components/Playlist/PlaylistTabs';
import { redirect } from 'next/navigation';
import { getAuthSession } from '@/utils/authentication';
import { getDataByUserId, CollectionsService } from '@/utils/collections';

interface BandPageProps {
  params: { uid: string };
}
export default async function BandPage({ params }: Readonly<BandPageProps>) {
  const session = await getAuthSession();
  if (!session?.currentUser) redirect(`/signin?unauthorized=true&returnTo=/bands/${params.uid}`);
  const { myBands } = await getDataByUserId(session?.currentUser?.uid);
  const currentBand = params.uid ? myBands?.find(b => b.id === params.uid) : myBands?.[0];
  if (!currentBand)
    return (
      <AppBanner
        title='Niet gevonden...'
        subTitle={`we konden geen match vinden tussen jou (${session?.currentUser?.email}) en band met kenmerk '${params.uid}'`}
      />
    );

  if (!currentBand.playlists || currentBand.playlists?.length === 0)
    return <Alert severity='error'>Deze band heeft nog geen playlists gekoppelt ... </Alert>;

  if (currentBand.playlists?.some(el => el.error)) {
    const isNotCollaborator = currentBand.playlists?.find(el => el.error.status === 404);

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

export async function generateStaticParams() {
  const bandIds = await CollectionsService.getBandIds();
  return bandIds.map(band => ({ uid: band.id }));
}
