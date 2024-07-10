'use client';
import { useCallback, useEffect, useState } from 'react';
import List from '@mui/material/List';

import Track from './Track';
import VoteSummary from '../Votes/VoteSummary';
import type { ITrack, IVote } from '@domain/content';

import VotingDialog from '../Votes/VotingDialog';

import { tracksListStyles } from './TracksList.styles';
import TrackLink from './TrackLink';

export default function TracksList({
  tracks,
  stats,
  enhancedView,
  onRefresh,
}: Readonly<{
  tracks?: ITrack[];
  stats?: (v: IVote) => any;
  enhancedView: boolean;
  onRefresh: Function;
}>) {
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
  }, []);

  return (
    <>
      <List sx={tracksListStyles}>
        {tracks?.map((track: ITrack, idx: number) => {
          const votes = stats && track.votes ? stats(track.votes) : undefined;
          return (
            <Track
              track={track}
              key={`track-${idx}`}
              divider={idx}
              onTrackSelected={enhancedView ? () => handleSelectedTrack(track) : undefined}
              enhancedView={enhancedView}
            >
              {enhancedView && votes ? (
                <VoteSummary votes={votes} />
              ) : (
                <TrackLink title='luister op spotify' url={track.url} />
              )}
            </Track>
          );
        })}
      </List>
      {selectedTrack && <VotingDialog track={selectedTrack} open={openDialog} onClose={handleDialogClose} />}
    </>
  );
}
