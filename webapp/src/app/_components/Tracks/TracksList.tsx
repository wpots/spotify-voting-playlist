'use client';
import { useCallback, useEffect, useState } from 'react';
import List from '@mui/material/List';

import Track from './Track';

import type { ITrack } from '@domain/content';

import VotingDialog from '../Votes/VotingDialog';

import { tracksListStyles } from './TracksList.styles';

type ReadOnlyTrackListProps = {
  tracks?: ITrack[];
  enhancedView: boolean;
  onRefresh: Function;
};

export default function TracksList({ tracks, enhancedView, onRefresh }: Readonly<ReadOnlyTrackListProps>) {
  const [selectedTrack, setSelectedTrack] = useState<ITrack | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (selectedTrack) {
      setOpenDialog(true);
    }
  }, [selectedTrack]);

  const handleSelectedTrack = (value: ITrack) => setSelectedTrack(value);

  const handleDialogClose = useCallback((reset: boolean) => {
    if (reset) {
      setSelectedTrack(null);
      onRefresh();
    }
    setOpenDialog(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <List sx={tracksListStyles}>
        {tracks?.map((track: ITrack, idx: number) => {
          return (
            <Track
              track={track}
              key={`track-${idx}`}
              divider={idx}
              onTrackSelected={enhancedView ? () => handleSelectedTrack(track) : undefined}
              enhancedView={enhancedView}
            />
          );
        })}
      </List>
      {selectedTrack && <VotingDialog track={selectedTrack} open={openDialog} onClose={handleDialogClose} />}
    </>
  );
}
