export const firebaseServerConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

export const tokenSettings = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  cookieName: process.env.FIREBASE_AUTH_COOKIE_NAME!,
  cookieSignatureKeys: [
    process.env.FIREBASE_AUTH_COOKIE_SIGNATURE_KEY_CURRENT!,
    process.env.FIREBASE_AUTH_COOKIE_SIGNATURE_KEY_PREVIOUS!,
  ],
  serviceAccount: {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL!,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n')!,
  },
};

export const middlewareConfig = {
  ...tokenSettings,
  cookieSerializeOptions: {
    path: '/',
    httpOnly: true,
    secure: process.env.USE_SECURE_COOKIES === 'true',
    sameSite: 'lax' as const,
    maxAge: 12 * 60 * 60 * 24,
  },
};
