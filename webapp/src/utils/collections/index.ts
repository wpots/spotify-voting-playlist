import * as CollectionsService from './collections.service'; // combining spotify and firestore stuff
import * as ManagementService from '@/libs/firebase/collections/firebase.management.service';

export async function getDataByUserId(userId: string) {
  try {
    const myBands = (await CollectionsService.getBandsByUserId(userId)) ?? [];
    const admins = process.env.ADMIN_ROLES ?? '';
    const isAdmin = admins.includes(userId); // TEMP placeholder until custom claims in auth
    return { ...(myBands && { myBands }), isAdmin };
  } catch (error) {
    console.error('COLLECTIONS SERVICE ERROR', error);
  }
}

export { CollectionsService, ManagementService };
