'use client';
import { useCallback, useEffect, useState } from 'react';
import List from '@mui/material/List';

import Track from './Track';
import VoteSummary from '../Votes/VoteSummary';
import type { ITrack } from '@domain/content';

import VotingDialog from '../Votes/VotingDialog';

import { tracksListStyles } from './TracksList.styles';

export default function TracksList({
  tracks,
  enhancedView,
  onFetchVotes,
}: {
  tracks: ITrack[];
  enhancedView: boolean;
  onFetchVotes: Function;
}) {
  const [selectedTrack, setSelectedTrack] = useState<ITrack | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (!selectedTrack && !openDialog) onFetchVotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openDialog, selectedTrack]);

  useEffect(() => {
    if (selectedTrack) {
      setOpenDialog(true);
    }
  }, [selectedTrack]);

  const handleSelectedTrack = (value: ITrack) => setSelectedTrack(value);

  const handleDialogClose = useCallback((reset: boolean) => {
    if (reset) setSelectedTrack(null);
    setOpenDialog(false);
  }, []);

  return (
    <>
      <List sx={tracksListStyles}>
        {tracks.map((track: ITrack, idx: number) => {
          return (
            <Track
              track={track}
              key={`track-${idx}`}
              divider={idx}
              onTrackSelected={enhancedView ? () => handleSelectedTrack(track) : undefined}
              enhancedView={enhancedView}
            >
              {enhancedView && <VoteSummary votes={track.votes} />}
            </Track>
          );
        })}
      </List>
      {selectedTrack && <VotingDialog track={selectedTrack} open={openDialog} onClose={handleDialogClose} />}
    </>
  );
}
