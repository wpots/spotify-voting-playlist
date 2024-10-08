'use client';

import { Typography } from '@mui/material';

interface TrackLinkProps {
  title: string;
  url: string;
}

export default function TrackLink({ title, url }: TrackLinkProps) {
  return (
    <Typography
      variant='caption'
      component='a'
      href={url}
      target='_blank'
      sx={{ textDecoration: 'underline', px: ' 1.5rem', pb: '1rem', display: 'block' }}
    >
      {title}
    </Typography>
  );
}
