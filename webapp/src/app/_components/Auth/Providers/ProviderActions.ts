'use server';
import type { FirebaseError } from 'firebase/app';
import { FormState } from './EmailLinkSignIn';
import { AuthProvider } from '@/utils/authentication';

function resolveAuthError(code: string) {
  switch (code) {
    case 'auth/quota-exceeded':
      return 'timeout, please try a different login method...';

    case 'auth/admin-restricted-operation':
      return 'unknown email, please try a known email';

    default:
      return code;
  }
}

export async function PasswordSignInAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  // do zod stuff

  try {
    const response = await AuthProvider.passwordSignIn(email, password);

    console.log('RESPONSE=======================', response);
  } catch (error) {
    console.log('OOOPS================', error);
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
    console.log(error);
    const message = resolveAuthError((error as FirebaseError).code);
    return { status: 'ERROR', error: message };
  }
}
