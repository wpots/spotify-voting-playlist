'use client';
import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import * as FireStoreService from '@/utils/firebase/firebase.service';
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import BandMembers from './BandMembers';
import { IBand, IUser } from '@domain/content';
import { useRouter } from 'next/router';

interface BandTeaserProps {
  band: IBand;
  children?: React.ReactNode;
}
/**
 *  TODO:
 * Add band Logo Firebase Storage / ofzo
 */

export default function BandTeaser({ band, children }: BandTeaserProps) {
  const router = useRouter();
  const handleClick = (e: React.SyntheticEvent) => {
    router.push(`/bands${band.id}`);
  };

  return (
    <Card sx={{ display: 'flex' }}>
      <CardActionArea onClick={handleClick}>
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
          image={`https://loremflickr.com/100/100/music?${band.id}`}
          alt={band.name}
        />
      </CardActionArea>
    </Card>
  );
}
