'use server';

import * as ContentService from '@/utils/content';

/**
 * https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#event-handlers
 *
 * Actions can be initiated by Form submits or evente handlers, they are the new nextJs way of handling POST requests (data mutations)
 */

import { IVoteItem } from '@domain/content';

export async function setUserVote(data: Pick<IVoteItem, 'trackId' | 'rating' | 'comment'>, memberId: string | null) {
  const session = { uid: undefined };
  const listOfAdmins = process.env.ADMIN_ROLES;
  if (!session?.uid) return { status: 401, message: 'unauthorized' };
  const userId = listOfAdmins?.includes(session.uid) && memberId ? memberId : session.uid;
  const payload = {
    ...data,
    userId,
  };
  try {
    await ContentService.setVote(payload);
    return { OK: true };
  } catch (error) {
    return { status: 400, message: 'voting failed', cause: error };
  }
}
