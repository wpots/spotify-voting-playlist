'use client';
import { Box } from '@mui/material';
import BandList from '../_components/Band/BandList';
import AppBanner from '../_components/UI/AppBanner';
import AppSnack from '../_components/UI/AppSnack';
import { useBandCollection } from '../_hooks/useCollections';

export default function Home() {
  const { myBands } = useBandCollection();
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
