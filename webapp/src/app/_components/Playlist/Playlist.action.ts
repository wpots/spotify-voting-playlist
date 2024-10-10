'use server';

import { CollectionsService } from '@/utils/collections';
import { IVoteItem, IError, IPlaylist } from '@domain/content';

export async function fetchPlaylistWithVotes(playlist: IPlaylist, memberIds: Array<string>) {
  try {
    return await CollectionsService.getPlaylistWithVotes(playlist, memberIds);
  } catch (error) {
    return { status: 500, message: 'failed fetching votes', cause: error };
  }
}
