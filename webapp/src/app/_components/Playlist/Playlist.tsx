'use client';

import PlaylistHeader from './PlaylistHeader';

import type { IPlaylist } from '@domain/content';

import useVoting from '@/app/_hooks/useVoting';
import PlaylistFooter from './PlaylistFooter';

import PlaylistAlertBox from './PlaylistAlertBox';
import TracksList from '../Tracks/TracksList';

export default function Playlist({ playlist }: { playlist: IPlaylist }) {
  const { fetchVotes, currentPlaylist, filterPlaylistBy } = useVoting({ playlist });

  const isVotableList = !currentPlaylist?.name.toUpperCase().includes('REPERTOIRE');

  return (
    <>
      <PlaylistHeader description={currentPlaylist?.description} url={currentPlaylist?.url} />

      {isVotableList && filterPlaylistBy.pendingUserVote && filterPlaylistBy.pendingUserVote?.length > 0 && (
        <PlaylistAlertBox title='Vergeet niet te stemmen!' isOpen={true}>
          <TracksList
            tracks={filterPlaylistBy.pendingUserVote}
            enhancedView={isVotableList}
            onFetchVotes={() => fetchVotes()}
          />
        </PlaylistAlertBox>
      )}

      {filterPlaylistBy.all && filterPlaylistBy.all?.length > 0 && (
        <TracksList tracks={filterPlaylistBy.all} enhancedView={isVotableList} onFetchVotes={() => fetchVotes()} />
      )}

      {isVotableList && <PlaylistFooter url={currentPlaylist?.url} />}
    </>
  );
}
