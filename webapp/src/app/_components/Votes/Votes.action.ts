'use server';

import { CollectionsService } from '@/utils/collections';
import { IVoteItem, IError } from '@domain/content';

export async function setTrackVote(data: Pick<IVoteItem, 'trackId' | 'rating' | 'comment'>, memberId: string | null) {
  const session = { uid: undefined };
  const listOfAdmins = process.env.ADMIN_ROLES;
  if (!session?.uid) return { status: 401, message: 'unauthorized' };
  const userId = listOfAdmins?.includes(session.uid) && memberId ? memberId : session.uid;
  const payload = {
    ...data,
    userId,
  };
  try {
    await CollectionsService.setVote(payload);
    return { OK: true };
  } catch (error) {
    return { status: 400, message: 'voting failed', cause: error };
  }
}

export async function fetchPlaylistVotes(trackIds: Array<string>, memberIds: Array<string>) {
  try {
    return await CollectionsService.fetchVotes(trackIds, memberIds);
  } catch (error) {
    return { status: 500, message: 'failed fetching votes', cause: error };
  }
}
