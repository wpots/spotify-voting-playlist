import { getApps, initializeApp } from "firebase/app";
import firebaseConfig from "../../../firebase.config";
import { getFirestore } from "firebase/firestore";
const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const fireStore = getFirestore(firebaseApp);
export { firebaseApp, fireStore };
