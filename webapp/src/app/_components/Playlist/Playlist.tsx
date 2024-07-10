'use client';

import PlaylistHeader from './PlaylistHeader';
import LoadingIcon from '@mui/icons-material/Sync';
import type { IPlaylist } from '@domain/content';

import useVoting, { FilteredPlaylist } from '@/app/_hooks/useVoting';
import PlaylistFooter from './PlaylistFooter';

import PlaylistAlertBox from './PlaylistAlertBox';
import TracksList from '../Tracks/TracksList';
import { Box, Chip, Divider, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export default function Playlist({ playlist }: { playlist: IPlaylist }) {
  const [isLoading, setIsLoading] = useState(true);
  const { fetchVotes, currentPlaylist, filterPlaylistBy, playlistFilters, memberStats } = useVoting({ playlist });
  const [currentFilter, setCurrentFilter] = useState<string>('alles');
  const isVotableList = !currentPlaylist?.name.toUpperCase().includes('REPERTOIRE');

  useEffect(() => {
    const initVotes = async () => {
      await fetchVotes();
    };
    initVotes();

    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playlistLinkTitle = isVotableList ? 'Pas de spotify lijst aan' : 'luister de hele set op spotify';
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
          {isVotableList && playlistFilters.length > 1 && <Typography variant='caption'>filter:</Typography>}
          {isVotableList &&
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
          stats={memberStats}
          enhancedView={isVotableList}
          onRefresh={() => fetchVotes()}
        />
      )}

      {!isLoading && isVotableList && filterPlaylistBy['stem!'] && filterPlaylistBy['stem!'].total > 0 && (
        <PlaylistAlertBox title={filterPlaylistBy['stem!'].title} isOpen={true}>
          <TracksList
            tracks={filterPlaylistBy['stem!'].tracks}
            enhancedView={isVotableList}
            onRefresh={() => fetchVotes()}
          />
        </PlaylistAlertBox>
      )}
      {isVotableList && <PlaylistFooter url={currentPlaylist?.url} />}
    </>
  );
}
