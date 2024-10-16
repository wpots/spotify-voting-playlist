'use server';

export async function AdminEditAction(_: FormState, formData: FormData) {
  const memberId = formData.get('memberId');
  const displayName = formData.get('displayName');
  const avatarUpload = formData.get('file');

  return { status: 'OK' };
}
