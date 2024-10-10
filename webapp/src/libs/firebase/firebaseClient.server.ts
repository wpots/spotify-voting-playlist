import 'server-only';
import { initializeServerApp } from 'firebase/app';
import { firebaseServerConfig } from './firebase.server.config';
import { getAuth } from 'firebase/auth';

export async function firebaseAuthClient(idToken?: string) {
  const firebaseServerApp = initializeServerApp(firebaseServerConfig, idToken ? { authIdToken: idToken } : {});
  const auth = getAuth(firebaseServerApp);
  await auth.authStateReady();
  return { fireAuth: auth, currentUser: auth.currentUser };
}
