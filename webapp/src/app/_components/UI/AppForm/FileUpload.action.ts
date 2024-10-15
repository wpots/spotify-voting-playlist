'use server';

import { ManagementService } from '@/utils/collections';

export async function uploadFile(file: File) {
  try {
    return await ManagementService.uploadFile(file);
  } catch (error) {
    return { status: 500, message: 'failed uploading img', cause: error };
  }
}
