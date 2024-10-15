'use client';
import {
  Typography,
  AppBar,
  Toolbar,
  Avatar,
  Menu,
  Box,
  MenuItem,
  Button,
  Divider,
  MenuList,
  ListItemIcon,
} from '@mui/material';

import { useState } from 'react';
import type { MouseEvent } from 'react';

import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';

import { useParams, useRouter } from 'next/navigation';
import AdminMenu from './AdminMenu';

import { useAuthentication } from '@/utils/authentication/ui';
import { useBandCollection } from '@/app/_hooks/useCollections';
import Link from 'next/link';

export default function AppHeader() {
  const { myBands, currentBand, isBandAdmin } = useBandCollection();
  const { signOut, auth } = useAuthentication();
  const params = useParams();
  const router = useRouter();
  const proxyVoteFor = params.memberid;
  // REFACTOR
  const adminRight = isBandAdmin && currentBand;
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const handleSignOut = async () => {
    await signOut();

    router.push('/signin');
  };

  return (
    <AppBar position='static' sx={{ border: proxyVoteFor ? '4px solid red' : null }}>
      <Toolbar sx={{ gap: '.5rem' }}>
        <Button href='/'>
          <Avatar src='/images/logo-invert.svg' sx={{ mr: '1rem' }} variant='square' />
        </Button>
        <Typography variant='h6' color='inherit' noWrap>
          Spotify Playlist Voting
        </Typography>
        <Box marginLeft='auto'>
          <Button
            id='menu-button'
            onClick={handleMenu}
            aria-controls={open ? 'menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar src={auth?.user?.photoURL ?? undefined} />
          </Button>
          <Menu
            id='menu'
            aria-labelledby='menu-button'
            open={open}
            onClose={handleClose}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuList>
              {myBands &&
                myBands.length > 1 &&
                myBands.map(b => {
                  return (
                    <MenuItem key={b.id} href={`/bands/${b.id}`} component='a'>
                      <ListItemIcon>
                        <LibraryMusicIcon />
                      </ListItemIcon>
                      {b.name}
                    </MenuItem>
                  );
                })}
              {myBands && myBands.length > 1 && <Divider />}
              {adminRight && <AdminMenu currentBand={currentBand} />}

              {!auth?.user?.uid && (
                <MenuItem href='/signin' LinkComponent={Link}>
                  <ListItemIcon>
                    <LoginIcon />
                  </ListItemIcon>
                  inloggen
                </MenuItem>
              )}

              {auth?.user?.uid && (
                <MenuItem href={`/profile/${auth?.user?.uid}`} component={Link}>
                  <ListItemIcon>
                    <Settings />
                  </ListItemIcon>
                  mijn profiel
                </MenuItem>
              )}
              {auth?.user?.uid && (
                <MenuItem onClick={handleSignOut}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  uitloggen
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
