'use server';

import { CollectionsService } from '@/utils/collections';
import { IPlaylist } from '@domain/content';

export async function fetchPlaylistWithVotes(playlist: IPlaylist, members: Array<any>) {
  try {
    return await CollectionsService.getPlaylistWithVotes(
      playlist,
      members.map(m => m.id)
    );
  } catch (error) {
    return { status: 500, message: 'failed fetching votes', cause: error };
  }
}
