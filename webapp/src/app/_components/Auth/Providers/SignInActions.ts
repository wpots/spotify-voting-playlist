'use server';

import { AuthProvider } from '@/utils/authentication';

export type FormState = {
  status: 'IDLE' | 'OK' | 'ERROR';
  data?: Record<string, string>;
  success?: string;
  error?: string;
};

export async function PasswordSignInAction(_: FormState, formData: FormData): Promise<FormState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  // do zod stuff
  try {
    const response = await AuthProvider.passwordSignIn(email, password);
    const userToken = await response.user.getIdToken();
    console.log('there');
    return { status: 'OK', data: { userToken } };
  } catch (error) {
    return { status: 'ERROR', error: error as string };
  }
}

export async function PasswordResetAction(state: FormState, formData: FormData): Promise<FormState> {
  const email = formData.get('email') as string;
  try {
    await AuthProvider.sendPasswordResetLink(email);
    return { status: 'OK', data: { email } };
  } catch (error) {
    return { status: 'ERROR', error: error as string };
  }
}

export async function PhoneSignInAction(formData: FormData) {
  const tel = formData.get('telephone') as string;
}
export async function GoogleSignInAction(formData: FormData) {}

export async function SendLinkSignInAction(_: FormState, formData: FormData): Promise<FormState> {
  const email = formData.get('email') as string;

  try {
    await AuthProvider.sendEmailLinkForSignIn(email);
    return { status: 'OK', data: { email } };
  } catch (error) {
    return { status: 'ERROR', error: error as string };
  }
}

export async function signOut() {
  await AuthProvider.signOut();
}
