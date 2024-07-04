import { Typography, AppBar, Toolbar, Avatar } from '@mui/material';
import { teal } from '@mui/material/colors';

export default async function AppHeader() {
  return (
    <AppBar position='static' sx={{ bgcolor: teal[800] }}>
      <Toolbar sx={{ gap: '.5rem' }}>
        <Avatar src='/images/logo-invert.svg' sx={{ mr: '1rem' }} variant='square' />
        <Typography variant='h6' color='inherit' noWrap>
          Votinglist for the band
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
