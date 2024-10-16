import 'server-only';
import { initializeServerApp } from 'firebase/app';
import { firebaseAdminConfig, firebaseManagementConfig } from './firebase.config';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { applicationDefault, getApp, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth as getAdminAuth } from 'firebase-admin/auth';

export async function firebaseServerClient(idToken?: string) {
  const firebaseServerApp = initializeServerApp(firebaseManagementConfig, idToken ? { authIdToken: idToken } : {});
  const fireAuth = getAuth(firebaseServerApp);
  const fireStore = getFirestore(firebaseServerApp);
  await fireAuth.authStateReady();
  return { fireAuth, currentUser: fireAuth.currentUser, fireSuperStore: fireStore };
}

export async function firebaseAdminClient() {
  let firebaseAdminApp = getApps().length > 0 && getApp('adminApp');
  if (!firebaseAdminApp) {
    firebaseAdminApp = initializeApp(
      {
        ...firebaseAdminConfig,
      },
      'adminApp'
    );
  }
  const fireAdmin = getAdminAuth(firebaseAdminApp);
  return { fireAdmin };
}
