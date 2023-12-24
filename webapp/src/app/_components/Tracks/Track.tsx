"use client";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import type { ITrack } from "@domain/playlist";
import Voting from "../Voting/Voting";
import FireStoreService from "@/utils/firebase/firebase.service";
import { AvatarGroup, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { SyntheticEvent } from "react";
export default function Track({ track }: { track: ITrack }) {
  const handleSetVote = async (vote: number) => {
    return await FireStoreService.setVote({ trackId: track.id, vote });
  };
  const members = [0, 1, 2, 3, 4];

  return (
    <ListItem
      alignItems="flex-start"
      secondaryAction={
        <IconButton edge="end" aria-label="edit">
          <EditIcon />
        </IconButton>
      }
    >
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
            <AvatarGroup>
              {members.map((member, idx) => (
                <Avatar src={`https://loremflickr.com/100/100/cat/?${idx}`} key={idx} />
              ))}
            </AvatarGroup>
          </>
        }
      />
    </ListItem>
  );
}
