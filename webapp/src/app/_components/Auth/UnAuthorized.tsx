import { Paper, Typography } from '@mui/material';

export default function UnAuthorized({ children }: { children: React.ReactNode }) {
  const getStyles = {
    padding: '2rem',
  };

  return (
    <Paper elevation={2} style={getStyles}>
      <Typography variant='h4' component='h1'>
        Je bent niet ingelogd
      </Typography>
      <Typography variant='subtitle1' component='p' mb={5}>
        Je probeert een pagina te bezoeken waarvoor je ingelogd moet zijn.
      </Typography>

      {children}

      <Typography variant='body2' component='p' gutterBottom mt={5}>
        Log in met jouw aangemaakte account. Indien je geen toegang hebt, kunnen andere leden met toegang jou
        uitnodigen.
      </Typography>
    </Paper>
  );
}
