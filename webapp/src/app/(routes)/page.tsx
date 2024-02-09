import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Box, Stack, Typography } from '@mui/material';
import { authOptions } from '@/utils/authentication/authOptions';
import * as ContentService from '@/utils/content/content.service';
import BandTeaser from '../_components/Band/BandTeaser';
import type { IBand } from '@domain/content';
import LoginButton from '../_components/Auth/LoginButton';

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
      <Box sx={{ padding: '2rem' }}>
        <Typography variant="h2">Welkom</Typography>
        <Typography variant="subtitle1">Leuk dat je er bij band!</Typography>
        {bands && (
          <Stack spacing={2} direction="row">
            {bands.map(band => (
              <BandTeaser band={band} key={band.id}></BandTeaser>
            ))}
          </Stack>
        )}
        {errorMessage && (
          <Typography variant="body1" sx={{ mb: '1rem' }}>
            {errorMessage}
          </Typography>
        )}
        {!userId && <LoginButton>Log in met Spotify</LoginButton>}
      </Box>
    </main>
  );
}
