import { firebaseAuthClient } from '@/libs/firebase/firebaseClient.server';
import { headers } from 'next/headers';

async function getAuthSession() {
  const requestHeaders = headers();
  const authToken = requestHeaders.get('Authorization')?.split(' ')[1];

  const fireAuth = await firebaseAuthClient(authToken);

  const session = {
    token: authToken,
    currentUser: fireAuth?.currentUser,
  };
  return session;
}

export { getAuthSession };
