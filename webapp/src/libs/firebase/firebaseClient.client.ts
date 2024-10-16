import { getApps, initializeApp, getApp } from 'firebase/app';
import { firebaseManagementConfig as firebaseConfig } from './firebase.config';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

let firebaseApp = getApps().length > 0 && getApp('clientApp');
if (!firebaseApp) {
  firebaseApp = initializeApp(
    {
      ...firebaseConfig,
    },
    'clientApp'
  );
}
const fireAuth = getAuth(firebaseApp);
const fireStore = getFirestore(firebaseApp);
export { firebaseApp, fireStore, fireAuth };
