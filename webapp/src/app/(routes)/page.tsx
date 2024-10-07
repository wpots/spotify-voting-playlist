import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Box } from '@mui/material';

import BandList from '../_components/Band/BandList';
import AppBanner from '../_components/UI/AppBanner';
import AppSnack from '../_components/UI/AppSnack';
import { getAuthSession } from '@/utils/authentication/firebase.provider';
import { getContentByUserId } from '@/utils/content';

export default async function Home() {
  const session = await getAuthSession(cookies());
  if (!session) redirect('/signin?unauthenticated=true&returnTo=/');

  const { myBands } = await getContentByUserId(session?.uid);

  const message = !myBands || myBands?.length === 0 ? 'You are not set up to collaborate.' : false;

  return (
    <main>
      <AppBanner title='Welkom' subTitle='fijn dat jij erbij band' />
      {myBands && (
        <Box sx={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <BandList bands={myBands} />
        </Box>
      )}

      {message && <AppSnack message={message} />}
    </main>
  );
}
