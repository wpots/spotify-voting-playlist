"use client";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import PlayIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";
import { AvatarGroup, Avatar, Divider, IconButton, ListItemButton, Stack, ButtonGroup, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import type { ITrack } from "@domain/playlist";
import Voting from "../Votes/VotingDetails";
import BandMembers from "../Band/BandMembers";
import React, { useState } from "react";
import { green, pink } from "@mui/material/colors";

interface TrackControlProps {
  onPlayBack?: (reset?: boolean) => void;
  isPlaying: boolean;
}

export default function TrackControls({ onPlayBack, isPlaying }: TrackControlProps) {
  const handlePlayback = (e: React.SyntheticEvent) => {
    if (onPlayBack) return onPlayBack();
  };
  const handleStop = (e: React.SyntheticEvent) => {
    if (onPlayBack) return onPlayBack(true);
  };
  return (
    // <Stack direction="row" spacing={1}>
    //   <IconButton onClick={handlePlayback} color={isPlaying ? "primary" : "inherit"} size="large">
    //     <PlayIcon fontSize="inherit" />
    //   </IconButton>
    //   <IconButton onClick={handlePlayback} color="inherit" size="large">
    //     <PauseIcon fontSize="inherit" />
    //   </IconButton>
    //   <IconButton onClick={handleStop} color="inherit" size="large">
    //     <StopIcon fontSize="inherit" />
    //   </IconButton>
    // </Stack>
    <ButtonGroup variant="outlined">
      <Button onClick={handlePlayback} color={isPlaying ? "primary" : "inherit"} size="small">
        <PlayIcon fontSize="inherit" />
      </Button>
      <Button onClick={handlePlayback} color="inherit" size="large">
        <PauseIcon fontSize="inherit" />
      </Button>
      <Button onClick={handleStop} color="inherit" size="large">
        <StopIcon fontSize="inherit" />
      </Button>
    </ButtonGroup>
  );
}
