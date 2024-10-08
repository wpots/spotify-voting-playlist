import { firebaseAuthClient } from '@/libs/firebase/firebaseClient.server';

async function getAuthServerSession(headers: Headers) {
  const authToken = headers.get('Authorization')?.split(' ')[1];
  if (!authToken) return;
  return firebaseAuthClient(authToken);
}

export { getAuthServerSession };
