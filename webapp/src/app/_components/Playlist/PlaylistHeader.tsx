import { Box, Link, Paper, Typography } from '@mui/material';
/**
 *
 * Add:
 * Link to playlist
 */
export default function PlaylistHeader({ description, url }: { description?: string; url?: string }) {
  return (
    <Box sx={{ py: '2rem' }}>
      {description && <Typography>{description}</Typography>}
      {url && (
        <Typography align='right' marginTop='1rem'>
          <Link href={url}>Pas de spotify lijst aan</Link>
        </Typography>
      )}
    </Box>
  );
}
