'use client';
import React from 'react';
import PlayIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import { ButtonGroup, Button } from '@mui/material';

interface TrackControlProps {
  onPlayBack?: (reset?: boolean) => void;
  isPlaying: boolean;
}

export default function TrackControls({ onPlayBack, isPlaying }: TrackControlProps) {
  const handlePlayback = () => {
    if (onPlayBack) return onPlayBack();
  };
  const handleStop = () => {
    if (onPlayBack) return onPlayBack(true);
  };
  return (
    <ButtonGroup variant={'outlined'}>
      <Button onClick={handlePlayback} size="large" variant={isPlaying ? 'contained' : 'outlined'}>
        <PlayIcon fontSize="inherit" />
      </Button>
      <Button onClick={handlePlayback} size="large">
        <PauseIcon fontSize="inherit" />
      </Button>
      <Button onClick={handleStop} size="large">
        <StopIcon fontSize="inherit" />
      </Button>
    </ButtonGroup>
  );
}
