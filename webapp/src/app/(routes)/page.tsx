import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Box, Typography } from '@mui/material';
import { authOptions } from '@/utils/authentication/authOptions';
import * as FireStoreService from '@/utils/firebase/firebase.service';
import BandTeaser from '../_components/Band/BandTeaser';
import type { IBand } from '@domain/content';
import LoginButton from '../_components/Auth/LoginButton';

export default async function Home() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  console.log('e', session?.error);
  const bands = userId ? ((await FireStoreService.getBandsByUserId(userId)) as IBand[]) : undefined;
  const errorMessage = !session?.user
    ? 'Je bent niet ingelogd.'
    : !bands || bands?.length === 0
    ? 'You are not set up to collaborate yet.'
    : false;
  if (bands?.length === 1) redirect(`/bands/${bands?.[0]?.id}`);
  return (
    <main>
      <Box sx={{ padding: '2rem' }}>
        <Typography variant="h2">Welkom</Typography>
        <Typography>Leuk dat je er bij band!</Typography>
        {bands && bands.map(band => <BandTeaser band={band} key={band.id}></BandTeaser>)}
        {errorMessage && <Typography>{errorMessage}</Typography>}
        {!userId && <LoginButton>Log in met Spotify</LoginButton>}
      </Box>
    </main>
  );
}
