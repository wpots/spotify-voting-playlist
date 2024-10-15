'use server';

import { getAuthSession } from '@/utils/authentication';
import { CollectionsService, ManagementService } from '@/utils/collections';
import { IVoteItem } from '@domain/content';

export async function setTrackVote(data: Pick<IVoteItem, 'trackId' | 'rating' | 'comment'>, memberId: string | null) {
  const {token, currentUser} = await getAuthSession();

  const isLoggedIn = currentUser;
  if (!isLoggedIn) return { status: 401, message: 'unauthorized' };

  const listOfAdmins = process.env.ADMIN_ROLES;
  const userId = listOfAdmins?.includes(currentUser!.uid) && memberId ? memberId : currentUser!.uid;
  const payload = {
    ...data,
    userId,
  };
  console.log('SET TRACK', userId);
  try {
    await ManagementService.setVote(payload, token!);
    console.log('SET TRAACK');
    return { OK: true };
  } catch (error) {
    console.log('ERROR', error);
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
