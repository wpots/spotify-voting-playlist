import { Typography, AppBar, Toolbar, Avatar } from '@mui/material';

export default async function AppHeader() {
  return (
    <AppBar position='static' sx={{ bgcolor: 'black' }}>
      <Toolbar sx={{ gap: '.5rem' }}>
        <Avatar src='/images/logo.svg' sx={{ mr: '1rem' }} variant='square' />
        <Typography variant='h6' color='inherit' noWrap>
          Votinglist for the band
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
