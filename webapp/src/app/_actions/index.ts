'use server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authentication/authOptions';
import * as FireStoreService from '@/utils/firebase/firebase.service';
import { IVote, IVoteItem } from '@domain/content';
/**
 * https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#event-handlers
 *
 * Actions can be initiated by Form submits or evente handlers, they are the new nextJs way of handling POST requests (data mutations)
 */
import { revalidatePath } from 'next/cache';
import { useParams } from 'next/navigation';

export async function setUserVote(data: Pick<IVoteItem, 'trackId' | 'rating' | 'comment'>, memberId: string | null) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { status: 401, message: 'unauthorized' };
  const userId = session.user.id === 'wietekeozturk' && memberId ? memberId : session.user.id;
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
