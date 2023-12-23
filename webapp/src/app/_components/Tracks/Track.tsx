import ListItem from "@mui/material/ListItem";

import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import type { ITrack } from "@domain/playlist";
import Voting from "../Voting/Voting";
import FireStoreService from "@/utils/firebase/firebase.service";

export default function Track({ track }: { track: ITrack }) {
  const handleSetVote = async (vote: number) => {
    return await FireStoreService.setVote({ trackId: track.id, vote });
  };
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
      </ListItemAvatar>
      <ListItemText
        primary={track.name}
        secondary={
          <>
            <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
              {track.artists.map(artist => artist.name).toString()}
            </Typography>
            <Voting onSetVote={handleSetVote} />
          </>
        }
      />
    </ListItem>
  );
}
