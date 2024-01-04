import { Typography } from "@mui/material";
import AppNotificationBar from "./AppNotificationBar";
import NightLifeIcon from "@mui/icons-material/Nightlife";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default async function AppFooter() {
  return (
    <>
      <AppNotificationBar />
      <Typography
        variant="caption"
        component="p"
        sx={{ padding: "2rem", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        made with {<NightLifeIcon />}
      </Typography>
    </>
  );
}
