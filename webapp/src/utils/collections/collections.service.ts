import 'server-only';
import * as FireStoreService from '@/libs/firebase/collections/firebase.collections.service';
import SpotifyService from '../../libs/spotify/spotify.service';
import type { IBand, IError, IPlaylist } from '@domain/content';
import type { Vote } from '@firebase/api';
import votesMapper from '../votes/votes.mapper';

const fetchVotes = async (trackIds: string[], memberIds: string[]) => {
  if (trackIds && trackIds.length > 0) {
    return (await FireStoreService.getVotesByBandMembers(memberIds, trackIds)) as unknown as Vote[];
  }
};

const fetchPlaylists = async (playlists: string[]) => {
  const lists = (await SpotifyService.getPlaylistsByBulk(playlists)) as IPlaylist[];
  const sessionListIdx = lists.map(l => l.name.toUpperCase()).indexOf('SESSION');
  if (sessionListIdx) {
    const sessionList = lists.splice(sessionListIdx, 1)[0];
    lists.unshift(sessionList);
  }
  return lists;
};

const getCurrentPlaylist = async (id: string) => {
  try {
    return await SpotifyService.getPlaylistById(id);
  } catch (error) {
    return { error };
  }
};

const getPlaylistWithVotes = async (playlist: IPlaylist, memberIds: Array<string>) => {
  const trackIds = playlist.tracks?.refs;
  if (!trackIds || memberIds.length === 0) return;
  try {
    const votes = await fetchVotes(trackIds, memberIds);

    if ((votes as IError)?.status === 500) return playlist;
    if (votes && (votes as Array<Vote>).length > 0) {
      return votes ? votesMapper.resolveVotesForPlaylistTracks(playlist, votes as Array<Vote>) : playlist;
    }
  } catch (error) {
    return playlist;
  }
};

const _getBand = async (bandId: string, band?: IBand) => {
  const currentBand: IBand | undefined = band ?? ((await FireStoreService.getBandById(bandId)) as unknown as IBand);

  if (!currentBand) return undefined;

  let playlists;
  if (currentBand.playlistIds && currentBand.playlistIds?.length > 0) {
    playlists = await fetchPlaylists(currentBand.playlistIds);
  }

  let members;
  if (currentBand.memberIds && currentBand.memberIds.length > 0) {
    members = await FireStoreService.getBandMembersById(currentBand.memberIds);
  }

  return {
    ...currentBand,
    logo: playlists?.[0]?.image,
    members,
    playlists,
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

const getBandIds = async () => {
  const allBands = await FireStoreService.getAllBands();
  return allBands ? allBands.map(b => b.id) : [];
};

export { getBandIds, getBandsByUserId, getCurrentPlaylist, fetchPlaylists, fetchVotes, getPlaylistWithVotes };
