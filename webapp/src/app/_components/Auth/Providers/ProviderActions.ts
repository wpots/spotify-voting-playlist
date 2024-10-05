'use server';
import { fireAuth } from '@/utils/firebase/firebaseClient';
import { sendSignInLinkToEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { FormState } from './EmailLinkSignIn';

export async function PasswordSignInAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const response = await signInWithEmailAndPassword(fireAuth, email, password);

    console.log('RESPONSE=======================', response);
  } catch (error) {
    console.log('OOOPS================', error);
  }
}

export async function PhoneSignInAction(formData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const response = await signInWithEmailAndPassword(fireAuth, email, password);

    console.log('RESPONSE=======================', response);
  } catch (error) {
    console.log('OOOPS================', error);
  }
}
export async function GoogleSignInAction(formData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const response = await signInWithEmailAndPassword(fireAuth, email, password);

    console.log('RESPONSE=======================', response);
  } catch (error) {
    console.log('OOOPS================', error);
  }
}
export async function SendLinkSignInAction(formState: FormState, formData: FormData): Promise<FormState> {
  const email = formData.get('email') as string;

  const actionCodeSettings = {
    url: 'https://votinglist.pettico.de',
    handleCodeInApp: true,
  };

  try {
    await sendSignInLinkToEmail(fireAuth, email, actionCodeSettings);
    return { status: 'OK', data: { email } };
  } catch (error) {
    return { status: 'ERROR', error: JSON.stringify(error) };
  }
}
