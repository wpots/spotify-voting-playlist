import * as FireStoreService from '@/utils/firebase/firebase.service';
import SpotifyService from '../spotify/spotify.service';
import votesMapper from '@/utils/votes/votes.mapper';
import type { IBand, IPlaylist } from '@domain/content';
import type { Vote } from '@firebase/api';

const getUpdatedPlaylists = async (memberIds: string[], playlistIds: string[]) => {
  const playlists = (await SpotifyService.getPlaylistsByBulk(playlistIds)) as IPlaylist[];
  if (!playlists || playlists?.length === 0) return undefined;

  let extendedPlaylists: IPlaylist[] = [];
  for (const list of playlists) {
    const trackIds = list?.tracks.refs;

    if (trackIds && trackIds.length > 0) {
      const votes = (await FireStoreService.getVotesByBandMembers(memberIds, trackIds)) as unknown as Vote[];
      if (votes && votes.length > 0) {
        const extendedList = votesMapper.resolveVotesForPlaylistTracks(list, votes);
        extendedPlaylists.push(extendedList);
      } else {
        extendedPlaylists.push(list);
      }
    }
  }

  if (extendedPlaylists?.length > 0) return extendedPlaylists;
};
const getCurrentBand = async (bandId: string, userId: string) => {
  const allUserBands = (await FireStoreService.getBandsByUserId(userId)) as IBand[];
  const currentBand: IBand | undefined = allUserBands?.find((band: IBand) => band.id === bandId);
  if (!currentBand) return undefined;
  const hasMembers = currentBand.members?.length > 0; // always 1 -> me
  const hasPlaylists = currentBand.playlists && currentBand.playlists?.length > 0;
  console.log('GETCURRENTBAND');
  const extendedPlaylists =
    hasPlaylists && hasMembers
      ? await getUpdatedPlaylists(currentBand.members as string[], currentBand.playlists as string[])
      : undefined;

  let extendedMembers;
  if (hasMembers) extendedMembers = await FireStoreService.getBandMembersById(currentBand.members as string[]);

  return { ...currentBand, playlists: extendedPlaylists, members: extendedMembers ?? currentBand.members };
};

export { getCurrentBand, getUpdatedPlaylists };
