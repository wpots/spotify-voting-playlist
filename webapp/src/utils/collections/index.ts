import * as CollectionsService from './collections.service';

export async function getDataByUserId(userId: string) {
  const myBands = (await CollectionsService.getBandsByUserId(userId)) ?? [];
  const admins = process.env.ADMIN_ROLES ?? '';
  const isAdmin = admins.includes(userId);

  return { ...(myBands && { myBands }), isAdmin };
}

export { CollectionsService };
