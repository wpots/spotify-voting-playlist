import { Paper, Typography } from '@mui/material';

export default function Welcome({ children }: { children: React.ReactNode }) {
  const getStyles = {
    padding: '2rem',
  };

  return (
    <Paper elevation={2} style={getStyles}>
      <Typography variant='h4' component='h1'>
        Welkom bij dé Voting List!
      </Typography>
      <Typography variant='subtitle1' component='p' mb={5}>
        Zoveel leden zoveel meningen
      </Typography>

      {children}

      <Typography variant='body2' component='p' gutterBottom mt={5}>
        Log in met jouw email of gebruik een wachtwoord. Heb je geen wachtwoord? 
         Via de wachtwoord reset link kun je een nieuwe aanmaken indien jouw email adres in het systeem bekend is. 
        
      </Typography>
    </Paper>
  );
}
