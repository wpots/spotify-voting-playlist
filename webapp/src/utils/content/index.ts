import * as ContentService from '@/utils/content/content.service';

export async function getContentByUserId(userId?: string) {
  const myBands = userId && (await ContentService.getBandsByUserId(userId));
  const admins = process.env.ADMIN_ROLES || '';
  const isAdmin = userId && admins.includes(userId);

  return { ...(myBands && { myBands }), isAdmin };
}
