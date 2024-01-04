import { Typography, AppBar, Toolbar } from "@mui/material";
export default async function AppHeader() {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* <CameraIcon className={classes.icon} /> */}
        <Typography variant="h6" color="inherit" noWrap>
          Album layout
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
