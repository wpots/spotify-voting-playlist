'use server';

import * as FireStoreService from '@/utils/firebase/firebase.service';

/**
 * https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#event-handlers
 *
 * Actions can be initiated by Form submits or evente handlers, they are the new nextJs way of handling POST requests (data mutations)
 */

import { getAuthSession } from '@/utils/authentication';
import { cookies } from 'next/headers';
import { IVoteItem } from '@domain/content';

export async function setUserVote(data: Pick<IVoteItem, 'trackId' | 'rating' | 'comment'>, memberId: string | null) {
  const session = await getAuthSession(cookies());
  const listOfAdmins = process.env.ADMIN_ROLES;
  if (!session?.uid) return { status: 401, message: 'unauthorized' };
  const userId = listOfAdmins?.includes(session.uid) && memberId ? memberId : session.uid;
  const payload = {
    ...data,
    userId,
  };
  try {
    await FireStoreService.setVote(payload);
    return { OK: true };
  } catch (error) {
    return { status: 400, message: 'voting failed', cause: error };
  }
}
