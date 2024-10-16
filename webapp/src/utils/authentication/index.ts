import { firebaseServerClient } from '@/libs/firebase/firebaseClient.server';
import * as AdminService from '@/libs/firebase/authentication/firebase.admin.service';
import { headers } from 'next/headers';

async function getAuthSession() {
  const requestHeaders = headers();
  const authToken = requestHeaders.get('Authorization')?.split(' ')[1];

  const fireAuth = await firebaseServerClient(authToken);

  const session = {
    token: authToken,
    currentUser: fireAuth?.currentUser,
  };
  return session;
}

export { getAuthSession, AdminService };
