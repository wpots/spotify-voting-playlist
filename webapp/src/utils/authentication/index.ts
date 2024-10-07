import { AuthContext } from './../firebase/firebase.context';
import { getAuthSession } from '@/utils/authentication/firebase.provider';
import { authMiddleware } from 'next-firebase-auth-edge';
import { serverConfig } from '@/utils/firebase/firebase.config';
import { useFirebaseAuthentication as useAuthentication } from '@/utils/firebase/firebase.hooks';
import * as AuthProvider from './firebase.provider';
import AuthContextProvider from '../firebase/firebase.context';

export {
  AuthProvider,
  useAuthentication,
  serverConfig,
  authMiddleware,
  getAuthSession,
  AuthContextProvider,
  AuthContext,
};
