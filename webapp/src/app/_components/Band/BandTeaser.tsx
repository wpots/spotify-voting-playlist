'use client';
import * as React from 'react';
import { Box, Card, CardActionArea, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
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
    <Card sx={{ maxWidth: '345px' }}>
      <CardActionArea href={`/bands/${band.id}`}>
        <CardHeader title={band.name} />
        <CardMedia
          component="img"
          sx={{ aspectRatio: '1' }}
          image={(band?.playlists?.[0] as IPlaylist)?.image || `https://loremflickr.com/100/100/music?${band.id}`}
          alt={band.name}
        />
        <CardActionArea sx={{ py: '1rem' }}>
          <BandMembers members={band.members as IUser[]} />
        </CardActionArea>
      </CardActionArea>
    </Card>
  );
}
