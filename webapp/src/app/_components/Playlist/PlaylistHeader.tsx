import { Box, Link, Paper, Typography } from '@mui/material';
/**
 *
 * Add:
 * Link to playlist
 */
export default function PlaylistHeader({
  description,
  url,
  linkTitle,
}: {
  description?: string;
  url?: string;
  linkTitle: string;
}) {
  return (
    <Box sx={{ py: '2rem' }}>
      {description && <Typography>{description}</Typography>}
      {url && (
        <Typography align='right' marginTop='1rem'>
          <Link href={url}>{linkTitle}</Link>
        </Typography>
      )}
    </Box>
  );
}
