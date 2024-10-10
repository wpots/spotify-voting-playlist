'use server';

import { CollectionsService } from '@/utils/collections';
import { IVoteItem, IError, IPlaylist } from '@domain/content';

export async function fetchPlaylistWithVotes(playlist: IPlaylist, members: Array<any>) {
  try {
    const memberIds: Array<string> = [];
    members.forEach(m => {
      memberIds.push(m.id);
      if (m.spotifyId) memberIds.push(m.spotifyId);
    });
    return await CollectionsService.getPlaylistWithVotes(playlist, memberIds);
  } catch (error) {
    return { status: 500, message: 'failed fetching votes', cause: error };
  }
}
