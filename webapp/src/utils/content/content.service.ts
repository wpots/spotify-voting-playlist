import * as FireStoreService from '@/utils/firebase/firebase.service';
import SpotifyService from '../spotify/spotify.service';
import type { IBand, IPlaylist } from '@domain/content';
import type { Vote } from '@firebase/api';

const fetchVotes = async (trackIds: string[], memberIds: string[]) => {
  if (trackIds && trackIds.length > 0) {
    return (await FireStoreService.getVotesByBandMembers(memberIds, trackIds)) as unknown as Vote[];
  }
};

const fetchPlaylists = async (playlists: string[]) => {
  const lists = (await SpotifyService.getPlaylistsByBulk(playlists)) as IPlaylist[];
  return lists;
};

const getCurrentPlaylist = async (id: string) => {
  try {
    return await SpotifyService.getPlaylistById(id);
  } catch (error) {
    return { error };
  }
};

const _getBand = async (bandId: string, band?: IBand) => {
  const currentBand: IBand | undefined = band ?? ((await FireStoreService.getBandById(bandId)) as unknown as IBand);

  if (!currentBand) return undefined;
  const hasMembers = currentBand.members?.length > 0; // always 1 -> me
  const hasPlaylists = currentBand.playlists && currentBand.playlists?.length > 0;
  let extendedPlaylists: any; // unreliable spotify api, returns error object on fail
  if (hasPlaylists && hasMembers) {
    extendedPlaylists = await fetchPlaylists(currentBand.playlists as string[]); // could return error object
  }

  let extendedMembers;
  if (hasMembers) extendedMembers = await FireStoreService.getBandMembersById(currentBand.members as string[]);

  return {
    ...currentBand,
    logo: !extendedPlaylists?.error ? (extendedPlaylists?.[0] as IPlaylist)?.image : undefined,
    members: extendedMembers ?? currentBand.members,
    ...(!extendedPlaylists?.error && { playlists: extendedPlaylists }),
    error: extendedPlaylists?.error ?? false,
  };
};

const getBandsByUserId = async (userId: string) => {
  const allBands = (await FireStoreService.getBandsByUserId(userId)) as IBand[];
  const extendedBands = [];
  for (const band of allBands) {
    const extendedBand = await _getBand(band.id, band);
    if (extendedBand) extendedBands.push(extendedBand);
  }

  return extendedBands;
};

export { getBandsByUserId, getCurrentPlaylist, fetchPlaylists, fetchVotes };
