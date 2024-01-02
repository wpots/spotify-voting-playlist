"use client";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { AvatarGroup, Avatar, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import type { ITrack } from "@domain/playlist";
import Voting from "../Voting/Voting";
import FireStoreService from "@/utils/firebase/firebase.service";

export default function Track({ track, divider }: { track: ITrack; divider: number }) {
  const handleSetVote = async (vote: number) => {
    return await FireStoreService.setVote({ trackId: track.id, vote });
  };
  const members = [0, 1, 2, 3, 4];
  return (
    <>
      {divider && <Divider variant="inset" component="li" />}
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src={`https://loremflickr.com/100/100/music`} />
        </ListItemAvatar>
        <ListItemText
          primary={track.name}
          secondary={
            <>
              <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                {track.artists.map(artist => artist.name).toString()}
              </Typography>
            </>
          }
        />
        <Voting onSetVote={handleSetVote} />
        <AvatarGroup>
          {members.map((member, idx) => (
            <Avatar src={`https://loremflickr.com/100/100/cat/?${idx}`} key={`avatar-${idx}`} />
          ))}
        </AvatarGroup>
      </ListItem>
    </>
  );
}
