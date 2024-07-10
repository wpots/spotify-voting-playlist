import { Box, Link, Paper, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
/**
 *
 * Add:
 * Link to playlist
 */
export default function PlaylistFooter({ description, url }: { description?: string; url?: string }) {
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
