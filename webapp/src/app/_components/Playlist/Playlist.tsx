'use client';

import PlaylistHeader from './PlaylistHeader';
import LoadingIcon from '@mui/icons-material/Sync';
import type { IPlaylist } from '@domain/content';

import useVoting, { FilteredPlaylist } from '@/app/_hooks/useVoting';
import PlaylistFooter from './PlaylistFooter';

import PlaylistAlertBox from './PlaylistAlertBox';
import TracksList from '../Tracks/TracksList';
import { Box, Chip, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export default function Playlist({ playlist }: { playlist: IPlaylist }) {
  const [isLoading, setIsLoading] = useState(true);
  const { fetchVotes, currentPlaylist, filterPlaylistBy, sortPlaylistByPopularity } = useVoting({ playlist });
  const [filteredPlaylist, setFilteredPlaylist] = useState<string>('alles');
  const isVotableList = !currentPlaylist?.name.toUpperCase().includes('REPERTOIRE');

  useEffect(() => {
    const initVotes = async () => {
      await fetchVotes();
    };
    initVotes();
    setIsLoading(false);
  }, []);

  const playlistLinkTitle = isVotableList ? 'Pas de spotify lijst aan' : 'luister de hele set op spotify';
  const handleFilter = (type: string) => {
    setFilteredPlaylist(type);
  };
  return (
    <>
      <PlaylistHeader
        description={currentPlaylist?.description}
        url={currentPlaylist?.url}
        linkTitle={playlistLinkTitle}
      />
      <Box sx={{ p: '1rem' }}>
        <Stack spacing={1} direction='row' justifyContent='center' alignItems='center'>
          <Typography variant='caption' sx={{ justifySelf: 'start', marginRight: 'auto!important' }}>
            filter:
          </Typography>
          {isVotableList &&
            ['compleet', 'incompleet', 'alles'].map(chip => {
              return (
                <Chip
                  onClick={() => handleFilter(chip)}
                  label={chip}
                  key={chip}
                  variant={filteredPlaylist === chip ? 'filled' : 'outlined'}
                />
              );
            })}
        </Stack>
      </Box>
      {isLoading ? (
        <LoadingIcon sx={{ display: 'flex', mx: 'auto', minHeight: '20vh' }} />
      ) : (
        <TracksList
          tracks={sortPlaylistByPopularity(filterPlaylistBy[filteredPlaylist as keyof FilteredPlaylist]?.tracks())}
          enhancedView={isVotableList}
          onRefresh={() => fetchVotes()}
        />
      )}

      {!isLoading &&
        isVotableList &&
        filterPlaylistBy.pendingUserVote?.tracks &&
        filterPlaylistBy.pendingUserVote.tracks().length > 0 && (
          <PlaylistAlertBox title={filterPlaylistBy.pendingUserVote.title} isOpen={true}>
            <TracksList
              tracks={filterPlaylistBy.pendingUserVote.tracks()}
              enhancedView={isVotableList}
              onRefresh={() => fetchVotes()}
            />
          </PlaylistAlertBox>
        )}
      {isVotableList && <PlaylistFooter url={currentPlaylist?.url} />}
    </>
  );
}
