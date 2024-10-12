import 'server-only';
import { initializeServerApp } from 'firebase/app';
import { firebaseServerConfig } from './firebase.server.config';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export async function firebaseAuthClient(idToken?: string) {
  const firebaseServerApp = initializeServerApp(firebaseServerConfig, idToken ? { authIdToken: idToken } : {});
  const auth = getAuth(firebaseServerApp);
  const fireStore = getFirestore(firebaseServerApp);
  await auth.authStateReady();
  return { fireAuth: auth, currentUser: auth.currentUser, fireSuperStore: fireStore };
}
