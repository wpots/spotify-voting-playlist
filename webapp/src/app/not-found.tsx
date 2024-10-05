'use client';
import { Box, Button, Typography } from '@mui/material';
export default function NotFound() {
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: '2rem' }}>
        <Typography variant='h2' component='h1'>
          Oh Cringe!!
        </Typography>
        <p>Deze pagina is zo skeer.</p>
        <Button onClick={() => window.location.reload()}>YOLO</Button>
      </Box>
    </>
  );
}
