'use client';

import PlaylistHeader from './PlaylistHeader';
import LoadingIcon from '@mui/icons-material/Sync';
import type { IPlaylist } from '@domain/content';

import PlaylistFooter from './PlaylistFooter';

import PlaylistAlertBox from './PlaylistAlertBox';
import TracksList from '../Tracks/TracksList';
import { Box, Chip, Divider, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import usePlaylist from './Playlist.hook';
import type { FilteredPlaylist } from './Playlist.hook';

type PlaylistProps = {
  playlist: IPlaylist;
  enabledVoting?: boolean;
};

export default function Playlist({ playlist, enabledVoting }: Readonly<PlaylistProps>) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentFilter, setCurrentFilter] = useState<string>('alles');

  const { currentPlaylist, fetchVotes, filterPlaylistBy, playlistFilters, isReady } = usePlaylist(playlist);

  useEffect(() => {
    const initVotes = async () => {
      await fetchVotes();
    };
    if (enabledVoting) {
      initVotes();
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabledVoting]);

  const playlistLinkTitle = enabledVoting ? 'Pas de spotify lijst aan' : 'luister de hele set op spotify';

  const handleFilter = (type: string) => {
    setCurrentFilter(type);
  };
  return (
    <>
      <PlaylistHeader
        description={currentPlaylist?.description}
        url={currentPlaylist?.url}
        linkTitle={playlistLinkTitle}
      />
      <Box sx={{ py: '1rem' }}>
        <Stack spacing={1} direction='row' justifyContent='flex-end' alignItems='center'>
          {enabledVoting && playlistFilters.length > 1 && <Typography variant='caption'>filter:</Typography>}
          {enabledVoting &&
            playlistFilters.length > 1 &&
            playlistFilters.map(chip => {
              return (
                <Chip
                  onClick={() => handleFilter(chip)}
                  label={chip}
                  key={chip}
                  variant={currentFilter === chip ? 'filled' : 'outlined'}
                  color='primary'
                />
              );
            })}
        </Stack>
      </Box>
      <Divider />
      {isLoading ? (
        <LoadingIcon sx={{ display: 'flex', mx: 'auto', minHeight: '20vh' }} />
      ) : (
        <TracksList
          tracks={filterPlaylistBy[currentFilter as keyof FilteredPlaylist]?.tracks}
          enhancedView={enabledVoting}
          onRefresh={() => fetchVotes()}
        />
      )}

      {isReady && enabledVoting && filterPlaylistBy['stem!'] && filterPlaylistBy['stem!'].total > 0 && (
        <PlaylistAlertBox title={filterPlaylistBy['stem!'].title} isOpen={true}>
          <TracksList
            tracks={filterPlaylistBy['stem!'].tracks}
            enhancedView={enabledVoting}
            onRefresh={() => fetchVotes()}
          />
        </PlaylistAlertBox>
      )}
      {enabledVoting && <PlaylistFooter url={currentPlaylist?.url} />}
    </>
  );
}
