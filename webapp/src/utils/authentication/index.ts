import { serverConfig } from '@/utils/firebase/firebase.config';
import { useAuthentication } from '@/utils/firebase/firebase.hooks';
import * as AuthProvider from './firebase.provider';
export { AuthProvider, useAuthentication, serverConfig };
