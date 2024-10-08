import * as ContentService from '@/utils/content/content.service';
import * as FireStoreService from '@/libs/firebase/collections/firebase.collections.service';
import { Vote } from '@firebase/api';

export async function getContentByUserId(userId?: string) {
  const myBands = userId && (await ContentService.getBandsByUserId(userId));
  const admins = process.env.ADMIN_ROLES || '';
  const isAdmin = userId && admins.includes(userId);

  return { ...(myBands && { myBands }), isAdmin };
}

export async function setVote(payload: Vote) {
  return await FireStoreService.setVote(payload);
}
