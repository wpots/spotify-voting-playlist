'use client';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
export default function NotFound() {
  const router = useRouter();
  return (
    <>
      <Box>
        <Typography variant="h2" component="h1">
          Connectie Problemen
        </Typography>
        <p>Spotify heeft opgehangen. Je kunt proberen de pagina te verversen...</p>
        <Button onClick={() => router.reload()}>ververs</Button>
      </Box>
    </>
  );
}
