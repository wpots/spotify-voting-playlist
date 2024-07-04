import { Typography, Avatar, Box } from '@mui/material';
import { PropsWithChildren } from 'react';
import { Comfortaa } from 'next/font/google';
import { teal } from '@mui/material/colors';

const headerFont = Comfortaa({
  subsets: ['latin'],
  display: 'swap',
});
export default function AppBanner({ title, avatar }: PropsWithChildren<{ title: string; avatar?: string }>) {
  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      sx={{ px: '2rem', backgroundColor: teal[400], m: '.5rem', mb: '2rem' }}
    >
      <Typography component='h1' variant='h4' sx={{ p: '1rem', textAlign: 'center' }} className={headerFont.className}>
        {title}
      </Typography>
      {avatar && <Avatar src={avatar} sx={{ width: 72, height: 72, mb: '-1rem' }} variant='rounded' />}
    </Box>
  );
}
