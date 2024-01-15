'use client';
import * as React from 'react';
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import BandMembers from './BandMembers';
import { IBand, IPlaylist, IUser } from '@domain/content';

interface BandTeaserProps {
  band: IBand;
  children?: React.ReactNode;
}
/**
 *  TODO:
 * Add band Logo Firebase Storage / ofzo
 */

export default function BandTeaser({ band, children }: BandTeaserProps) {
  return (
    <Card sx={{ display: 'flex' }}>
      <CardActionArea href={`/bands/${band.id}`}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
              {band.name}
            </Typography>
          </CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            {children}
            <BandMembers members={band.members as IUser[]} />
          </Box>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={(band?.playlists?.[0] as IPlaylist)?.image || `https://loremflickr.com/100/100/music?${band.id}`}
          alt={band.name}
        />
      </CardActionArea>
    </Card>
  );
}
