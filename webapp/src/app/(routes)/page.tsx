import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Typography } from '@mui/material';
import { authOptions } from '@/utils/authentication/authOptions';
import * as FireStoreService from '@/utils/firebase/firebase.service';
import BandTeaser from '../_components/Band/BandTeaser';
import type { IBand } from '@domain/content';

export default async function Home() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const bands = userId ? ((await FireStoreService.getBandsByUserId(userId)) as IBand[]) : undefined;

  const errorMessage = !session?.user
    ? 'You are not logged in.'
    : !bands || bands?.length === 0
    ? 'You are not set up to collaborate yet.'
    : false;
  if (bands?.length === 1) redirect(`/bands/${bands?.[0]?.id}`);
  return (
    <main>
      <Typography>Hi {session?.user?.name}</Typography>
      <Typography>some introductory text</Typography>
      {bands && bands.map(band => <BandTeaser band={band} key={band.id}></BandTeaser>)}
      {errorMessage && <Typography>{errorMessage}</Typography>}
    </main>
  );
}
