import { Box } from '@mui/material';
import BandList from '../_components/Band/BandList';
import AppSnack from '../_components/UI/AppSnack';
import { redirect } from 'next/navigation';
import { getAuthSession } from '@/utils/authentication';
import { getDataByUserId } from '@/utils/collections';

export default async function Home() {
  const session = await getAuthSession();
  if (!session?.currentUser) redirect('/signin?unauthorized=true&returnTo=/');
  const { myBands } = await getDataByUserId(session?.currentUser?.uid);
  const message = !myBands || myBands?.length === 0 ? 'Ik kon jouw band niet vinden :(' : false;
  return (
    <main>
      {myBands && myBands.length > 0 && (
        <Box sx={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <BandList bands={myBands} />
        </Box>
      )}

      {message && <AppSnack message={message} />}
    </main>
  );
}
