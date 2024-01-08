import * as FireStoreService from '@/utils/firebase/firebase.service';
import SpotifyService from '../spotify/spotify.service';
import votesMapper from '@/utils/votes/votes.mapper';
import type { IBand } from '@domain/content';
import type { Vote, Band } from '@firebase/api';

const getCurrentBand = async (bandId: string, userId: string) => {
  const allUserBands = (await FireStoreService.getBandsByUserId(userId)) as IBand[];
  const currentBand: Band | undefined = allUserBands?.find((band: IBand) => band.id === bandId);
  if (!currentBand) return undefined;
  const hasMembers = currentBand.members?.length > 0; // always 1 -> me
  const hasPlaylists = currentBand.playlists && currentBand.playlists?.length > 0;

  let playlistRefs = hasPlaylists ? await SpotifyService.getPlaylistsByBulk(currentBand.playlists) : undefined;
  let extendedPlaylists = [];
  if (playlistRefs && playlistRefs?.length > 0) {
    for (const list of playlistRefs) {
      const trackIds = list.tracks.refs;

      if (trackIds && trackIds.length > 0) {
        const votes = (await FireStoreService.getVotesByBandMembers(
          currentBand.members,
          trackIds
        )) as unknown as Vote[];
        if (votes && votes.length > 0) {
          const extendedList = votesMapper.resolveVotesForPlaylistTracks(list, votes);
          extendedPlaylists.push(extendedList);
        } else {
          extendedPlaylists.push(list);
        }
      }
    }
  }
  let extendedMembers;
  if (hasMembers) extendedMembers = await FireStoreService.getBandMembersById(currentBand.members as string[]);

  return { ...currentBand, playlists: extendedPlaylists, members: extendedMembers ?? currentBand.members };
};

export { getCurrentBand };
