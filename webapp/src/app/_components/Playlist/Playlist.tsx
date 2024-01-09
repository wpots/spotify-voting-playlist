'use client';
import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import PlaylistHeader from './PlaylistHeader';
import Track from '../Tracks/Track';
import VoteSummary from '../Votes/VoteSummary';
import type { IPlaylist, ITrack } from '@domain/content';
import useUser from '@/app/_hooks/useUser';
import VotingDialog from '../Votes/VotingDialog';
// import TrackControls from "../Tracks/TrackControls";

export default function Playlist({ playlist }: { playlist: IPlaylist }) {
  // const [playId, setPlayId] = useState<string | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<ITrack | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const handleSelectedTrack = (value: ITrack) => setSelectedTrack(value);
  useEffect(() => {
    if (selectedTrack) {
      setOpenDialog(true);
    }
  }, [selectedTrack]);
  const handleDialogClose = () => setOpenDialog(false);
  // const handlePlayback = (id: string, reset?: boolean) => {
  //   if (id === playId) {
  //     if (reset) {
  //       // api call spotify to reset playhead to zero
  //     } else {
  //       // api call spotify to pause
  //     }
  //     setPlayId(null);
  //   } else {
  //     setPlayId(id);
  //     // api call spotify to play
  //   }
  // }; <fgvc>    </fgvc>
  const tracks = playlist.tracks.items;

  return (
    <>
      <PlaylistHeader description={playlist.description} url={playlist.url} />

      {playlist.tracks.items?.length > 0 && (
        <List sx={{ width: '100%', bgcolor: 'background.paper', border: '1px solid lightgrey' }}>
          {tracks.map((track: ITrack, idx: number) => {
            return (
              <Track
                track={track}
                key={`track-${idx}`}
                divider={idx}
                onTrackSelected={() => handleSelectedTrack(track)}
                // controls={
                //   <TrackControls
                //     onPlayBack={(reset?: boolean) => handlePlayback(track.id, reset)}
                //     isPlaying={track.id === playId}
                //   />
                // }
              >
                <VoteSummary votes={track.votes} />
              </Track>
            );
          })}
        </List>
      )}
      {selectedTrack && <VotingDialog track={selectedTrack} open={openDialog} onClose={handleDialogClose} />}
    </>
  );
}
