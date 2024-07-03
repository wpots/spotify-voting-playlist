'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import List from '@mui/material/List';
import PlaylistHeader from './PlaylistHeader';
import Track from '../Tracks/Track';
import VoteSummary from '../Votes/VoteSummary';
import type { IPlaylist, ITrack, IVoteItem } from '@domain/content';

import VotingDialog from '../Votes/VotingDialog';
import useVoting from '@/app/_hooks/useVoting';
import PlaylistFooter from './PlaylistFooter';
import TrackComments from '../Tracks/TrackComments';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
// import TrackControls from "../Tracks/TrackControls";

export default function Playlist({ playlist }: { playlist: IPlaylist }) {
  const [selectedTrack, setSelectedTrack] = useState<ITrack | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { fetchVotes, currentPlaylist, currentTracks, sortedPlaylistBy } = useVoting({ playlist });
  const [openAlert, setOpenAlert] = useState(
    sortedPlaylistBy.pendingUserVote && sortedPlaylistBy.pendingUserVote.length > 0
  );
  const handleSelectedTrack = (value: ITrack) => setSelectedTrack(value);

  useEffect(() => {
    if (!selectedTrack && !openDialog) fetchVotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openDialog, selectedTrack]);

  useEffect(() => {
    if (selectedTrack) {
      setOpenDialog(true);
    }
  }, [selectedTrack]);

  const handleDialogClose = useCallback((reset: boolean) => {
    if (reset) setSelectedTrack(null);
    setOpenDialog(false);
  }, []);

  const isVotableList = !currentPlaylist?.name.toUpperCase().includes('REPERTOIRE');
  const lists = [sortedPlaylistBy.pendingUserVote, currentTracks];
  return (
    <>
      <PlaylistHeader description={currentPlaylist?.description} url={currentPlaylist?.url} />
      <Dialog open={openAlert} onClose={() => setOpenAlert(false)} sx={{ p: '2rem' }}>
        <DialogTitle>Je hebt nog niet gestemd!</DialogTitle>
        <DialogContent>
          {sortedPlaylistBy.pendingUserVote && sortedPlaylistBy.pendingUserVote?.length > 0 && (
            <List
              sx={{
                width: '100%',
                bgcolor: 'background.paper',
                color: 'black',
                border: '1px solid red',
                p: '0',
                mb: '2rem',
              }}
            >
              {sortedPlaylistBy.pendingUserVote.map((track: ITrack, idx: number) => {
                return (
                  <Track
                    track={track}
                    key={`track-${idx}`}
                    divider={idx}
                    onTrackSelected={isVotableList ? () => handleSelectedTrack(track) : undefined}
                    enhancedView={isVotableList}
                  >
                    {isVotableList && <VoteSummary votes={track.votes} />}
                  </Track>
                );
              })}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAlert(false)}>Nu even niet</Button>
        </DialogActions>
      </Dialog>

      {currentTracks && currentTracks?.length > 0 && (
        <List
          sx={{ width: '100%', bgcolor: 'background.paper', color: 'black', border: '1px solid lightgrey', p: '0' }}
        >
          {currentTracks.map((track: ITrack, idx: number) => {
            return (
              <Track
                track={track}
                key={`track-${idx}`}
                divider={idx}
                onTrackSelected={isVotableList ? () => handleSelectedTrack(track) : undefined}
                enhancedView={isVotableList}
              >
                {isVotableList && <VoteSummary votes={track.votes} />}
              </Track>
            );
          })}
        </List>
      )}
      {isVotableList && <PlaylistFooter url={currentPlaylist?.url} />}
      {selectedTrack && <VotingDialog track={selectedTrack} open={openDialog} onClose={handleDialogClose} />}
    </>
  );
}
