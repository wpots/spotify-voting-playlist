import { getApps, initializeApp } from 'firebase/app';
import { firebaseManagementConfig as firebaseConfig } from './firebase.config';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

console.log('INIT CLIENT CLIENT', getApps());

const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig, 'clientApp') : getApps()[0];
const fireAuth = getAuth(firebaseApp);
const fireStore = getFirestore(firebaseApp);
export { firebaseApp, fireStore, fireAuth };
