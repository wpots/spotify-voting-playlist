import { Paper, Typography } from "@mui/material";

export default function Welcome({ children }: { children: React.ReactNode }) {
  const getStyles = {
    padding: "2rem",
  };

  return (
    <Paper elevation={2} style={getStyles}>
      <Typography variant="h3" component="h1">
        Welkom bij PlaylistVoting!
      </Typography>
      <Typography variant="subtitle1" component="p" mb={5}>
        Zoveel leden zoveel meningen
      </Typography>

      {children}

      <Typography variant="body2" component="p" gutterBottom mt={5}>
        Log in met je spotify account. Indien je geen toegang hebt, kunnen andere leden met toegang jou uitnodigen.
      </Typography>
    </Paper>
  );
}
