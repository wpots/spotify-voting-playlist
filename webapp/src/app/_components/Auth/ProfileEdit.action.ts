'use server';

import { getAuthSession } from '@/utils/authentication';
import { ManagementService } from '@/utils/collections';

export async function ProfileEditAction(_: FormState, formData: FormData) {
  const { token } = await getAuthSession();
  const displayName = formData.get('displayName') as string;

  try {
    await ManagementService.setUserDisplayName(displayName, token);
    return { status: 'OK' };
  } catch (error) {
    return { status: 'ERROR' };
  }
}
