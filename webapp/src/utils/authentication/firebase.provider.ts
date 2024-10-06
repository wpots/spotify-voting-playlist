import { sendSignInLinkToEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { fireAuth } from '../firebase/firebaseClient';

export async function sendEmailLinkForSignIn(email: string) {
  return await sendSignInLinkToEmail(fireAuth, email, {
    url: process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://votinglist.pettico.de',
    handleCodeInApp: true,
  });
}

export async function passwordSignIn(email: string, password: string) {
  return await signInWithEmailAndPassword(fireAuth, email, password);
}
