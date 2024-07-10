'use client';
import { Stack, useMediaQuery, useTheme } from '@mui/material';
import BandTeaser from './BandTeaser';
import type { IBand } from '@domain/content';

export default function BandList({ bands }: { bands: IBand[] }) {
  const theme = useTheme();
  const onlyMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Stack spacing={2} direction={onlyMobile ? 'column' : 'row'} alignItems={onlyMobile ? 'stretch' : 'center'}>
      {bands.map(band => (
        <BandTeaser band={band} key={band.id} />
      ))}
    </Stack>
  );
}
