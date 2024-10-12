import * as CollectionsService from './collections.service'; // combining spotify and firestore stuff
import * as ManagementService from '@/libs/firebase/collections/firebase.management.service';

export async function getDataByUserId(userId: string) {
  const myBands = (await CollectionsService.getBandsByUserId(userId)) ?? [];
  const admins = process.env.ADMIN_ROLES ?? '';
  const isAdmin = admins.includes(userId); // TEMP placeholder until custom claims in auth
  return { ...(myBands && { myBands }), isAdmin };
}

export { CollectionsService, ManagementService };
