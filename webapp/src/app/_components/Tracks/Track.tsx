"use client";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { AvatarGroup, Avatar, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import type { ITrack } from "@domain/playlist";
import Voting from "../Voting/Voting";
import BandMembers from "../Band/BandMembers";

export default function Track({ track, divider }: { track: ITrack; divider: number }) {
  const handleSetVote = async (vote: number) => {
    return await fetch(`/api/votes/${track.id}?vote=${vote}`, { method: "POST" });
  };
  const members = ['0', '1', '2', '3', '4'];
  return (
    <>
      {divider > 0 && <Divider variant="inset" component="li" />}
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src={`https://loremflickr.com/100/100/music?${divider}`} />
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
        <BandMembers members={members} />
      </ListItem>
    </>
  );
}
