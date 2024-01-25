'use client';
import { Box, Button, Typography } from '@mui/material';
export default function NotFound() {
  return (
    <>
      <Box>
        <Typography variant="h2" component="h1">
          Connectie Problemen
        </Typography>
        <p>Spotify heeft opgehangen. Je kunt proberen de pagina te verversen...</p>
        <Button onClick={() => window.location.reload()}>ververs</Button>
      </Box>
    </>
  );
}
