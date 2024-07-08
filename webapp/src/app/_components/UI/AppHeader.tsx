'use client';
import { Typography, AppBar, Toolbar, Avatar, Menu, Box, MenuItem, Button, Divider, MenuList } from '@mui/material';
import { teal } from '@mui/material/colors';
import { useCallback, useState } from 'react';

export default function AppHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const handleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);
  return (
    <AppBar position='static' sx={{ bgcolor: teal[800] }}>
      <Toolbar sx={{ gap: '.5rem' }}>
        <Avatar src='/images/logo-invert.svg' sx={{ mr: '1rem' }} variant='square' />
        <Typography variant='h6' color='inherit' noWrap>
          Votinglist for the band
        </Typography>
        <Box marginLeft='auto'>
          <Button onClick={handleMenu}>
            <Avatar src='https://loremflickr.com/100/100/cat' />
          </Button>
          <Menu open={isOpen}>
            <MenuList>
              <MenuItem>actie iets</MenuItem>
              <Divider />
              <MenuItem>band 1</MenuItem>
              <MenuItem>band 2</MenuItem>
              <Divider />
              <MenuItem>log uit</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
