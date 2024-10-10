import { Box, Link, Typography } from '@mui/material';

export default function PlaylistFooter({ url }: { description?: string; url?: string }) {
  return (
    <Box sx={{ display: 'flex', py: '2rem', flexWrap: 'wrap' }} justifyContent='space-between'>
      <Typography variant='caption'>
        Deze lijst is gesorteerd op meeste stemmen en daarna het gemiddelde van deze stemmen.
      </Typography>
      {url && (
        <Typography align='right' variant='caption' justifySelf='flex-end' marginLeft='auto'>
          <Link href={url}>voeg nummers toe...</Link>
        </Typography>
      )}
    </Box>
  );
}
