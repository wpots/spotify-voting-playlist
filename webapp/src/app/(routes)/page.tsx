import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Box,  Typography } from '@mui/material';
import { authOptions } from '@/utils/authentication/authOptions';
import * as ContentService from '@/utils/content/content.service';

import type { IBand } from '@domain/content';
import LoginButton from '../_components/Auth/LoginButton';
import BandList from '../_components/Band/BandList';
import AppBanner from '../_components/UI/AppBanner';

export default async function Home() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  let bands: IBand[] | undefined;

  if (userId) {
    bands = await ContentService.getBandsByUserId(userId);
  }

  const errorMessage = !session?.user
    ? 'Je bent niet ingelogd.'
    : !bands || bands?.length === 0
    ? 'You are not set up to collaborate.'
    : false;

  if (bands?.length === 1) redirect(`/bands/${bands?.[0]?.id}`);
  return (
    <main>
      <AppBanner title='Welkom' subTitle='fijn dat jij erbij band' />
      <Box sx={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {bands && <BandList bands={bands} />}
        {errorMessage && (
          <Typography variant='body1' sx={{ mb: '1rem' }}>
            {errorMessage}
          </Typography>
        )}
        {!userId && <LoginButton>Log in met Spotify</LoginButton>}
      </Box>
    </main>
  );
}
