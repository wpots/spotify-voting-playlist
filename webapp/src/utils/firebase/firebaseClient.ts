import { getApps, initializeApp } from 'firebase/app';
import firebaseConfig from './firebase.config';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const fireStore = getFirestore(firebaseApp);
const fireAuth = getAuth(firebaseApp);

export { firebaseApp, fireStore, fireAuth };
