'use server';

import { CollectionsService } from '@/utils/collections';
import { IVoteItem } from '@domain/content';
import { headers } from 'next/headers';

export async function setTrackVote(data: Pick<IVoteItem, 'trackId' | 'rating' | 'comment'>, memberId: string | null) {
  const session = { uid: undefined };
  const requestHeaders = headers();
  const isLoggedIn = requestHeaders.get('Authorization')?.split('Bearer ')[1];
  console.log('here', isLoggedIn);
  const listOfAdmins = process.env.ADMIN_ROLES;
  if (!isLoggedIn) return { status: 401, message: 'unauthorized' };
  const userId = listOfAdmins?.includes(session.uid || isLoggedIn) && memberId ? memberId : session.uid;
  const payload = {
    ...data,
    userId: 'cyQA2fN4w3hD3aDhY9kDbeVndMR2',
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
