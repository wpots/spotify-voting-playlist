import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Box } from '@mui/material';
import { authOptions } from '@/utils/authentication/authOptions';
import * as ContentService from '@/utils/content/content.service';

import type { IBand } from '@domain/content';
import LoginScreen from '../_components/Auth/LoginScreen';
import BandList from '../_components/Band/BandList';
import AppBanner from '../_components/UI/AppBanner';
import AppSnack from '../_components/UI/AppSnack';

export default async function Home() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  let bands: IBand[] | undefined;

  if (userId) {
    bands = await ContentService.getBandsByUserId(userId);
  }

  const errorMessage = !session?.user
    ? 'You are not logged in.'
    : !bands || bands?.length === 0
    ? 'You are not set up to collaborate.'
    : false;

  if (bands?.length === 1) redirect(`/bands/${bands?.[0]?.id}`);
  return (
    <main>
      <AppBanner title='Welkom' subTitle='fijn dat jij erbij band' />
      <Box sx={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {bands && <BandList bands={bands} />}

        {!userId && <LoginScreen />}
        {errorMessage && <AppSnack message={errorMessage} />}
      </Box>
    </main>
  );
}
