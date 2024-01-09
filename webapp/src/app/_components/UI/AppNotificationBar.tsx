"use client";
import { Alert, AlertTitle, Button, Typography } from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";
import LogoutButton from "../Auth/LogoutButton";
export default function AppNotificationBar() {
  return (
    <Alert
      severity="info"
      icon={<ConstructionIcon fontSize="inherit" />}
      action={<LogoutButton>uitloggen</LogoutButton>}
    >
      <AlertTitle>Deze app is nog in ontwikkeling.</AlertTitle>
      <Typography variant="caption">Problemen? Probeer dan uit te loggen en weer opnieuw in te loggen.</Typography>
    </Alert>
  );
}
