'use server';

import { getAuthSession } from '@/utils/authentication';
import { CollectionsService, ManagementService } from '@/utils/collections';
import { IVoteItem } from '@domain/content';

export async function setTrackVote(data: Pick<IVoteItem, 'trackId' | 'rating' | 'comment'>, memberId: string | null) {
  const session = await getAuthSession();
  const isLoggedIn = session.currentUser;
  if (!isLoggedIn) return { status: 401, message: 'unauthorized' };

  const listOfAdmins = process.env.ADMIN_ROLES;
  const userId = listOfAdmins?.includes(session!.currentUser!.uid) && memberId ? memberId : session!.currentUser!.uid;
  const payload = {
    ...data,
    userId,
  };
  try {
    await ManagementService.setVote(payload, session.token!);
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
