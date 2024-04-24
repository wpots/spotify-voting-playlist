import { Typography, AppBar, Toolbar, Avatar } from "@mui/material";

export default async function AppHeader() {
  return (
    <AppBar position="static" sx={{ bgcolor: "black" }}>
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          Voting for Shared Spotify Playlists
        </Typography>
        {/* <Avatar src="/images/logo.svg" sx={{ mr: "1rem" }} variant="square" /> */}
      </Toolbar>
    </AppBar>
  );
}
