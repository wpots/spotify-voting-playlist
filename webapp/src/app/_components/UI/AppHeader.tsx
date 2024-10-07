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
  ListSubheader,
} from '@mui/material';
import { teal } from '@mui/material/colors';
import { useState } from 'react';
import type { MouseEvent } from 'react';
import useUser from '@/app/_hooks/useUser';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import Login from '@mui/icons-material/Login';
import Logout from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';
import { IUser } from '@domain/content';
import { useParams } from 'next/navigation';
import AdminMenu from './AdminMenu';
import { signOut } from '../Auth/Providers/SignInActions';
import { useAuthentication } from '@/utils/authentication';

export default function AppHeader() {
  const { myBands, isAdmin, profile, auth } = useUser();
  const { logout } = useAuthentication();
  const params = useParams();
  const proxyVoteFor = params.memberid;
  const currentBand = myBands?.find(b => b.id === params.uid);
  const adminRight = isAdmin && currentBand;
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handleMenu = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const handleSignOut = async () => {
    await logout();
    await signOut();
  };

  return (
    <AppBar position='static' sx={{ border: proxyVoteFor ? '4px solid red' : null }}>
      <Toolbar sx={{ gap: '.5rem' }}>
        <Button href='/'>
          <Avatar src='/images/logo-invert.svg' sx={{ mr: '1rem' }} variant='square' />
        </Button>
        <Typography variant='h6' color='inherit' noWrap>
          Votinglist for the band
        </Typography>
        <Box marginLeft='auto'>
          <Button
            id='menu-button'
            onClick={handleMenu}
            aria-controls={open ? 'menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar src={profile?.image ?? undefined} />
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

              {!profile?.uid && (
                <MenuItem href='/signin'>
                  <ListItemIcon>
                    <Login />
                  </ListItemIcon>
                  inloggen
                </MenuItem>
              )}

              {profile?.uid && (
                <MenuItem component='a' href={`https://open.spotify.com/user/${profile?.spotify?.id}`}>
                  <ListItemIcon>
                    <Settings />
                  </ListItemIcon>
                  wijzig profielnaam
                </MenuItem>
              )}
              {profile?.uid && (
                <MenuItem onClick={handleSignOut}>
                  <ListItemIcon>
                    <Logout />
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
