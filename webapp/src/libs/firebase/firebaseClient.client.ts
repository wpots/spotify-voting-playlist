import { getApps, initializeApp } from 'firebase/app';
import { firebaseServerConfig as firebaseConfig } from './firebase.server.config';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const fireAuth = getAuth(firebaseApp);
const fireStore = getFirestore(firebaseApp);
export { firebaseApp, fireStore, fireAuth };
