import './globals.css';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import Provider from '@/app/_context/client-session-provider';

import { authOptions } from '@/utils/authentication/authOptions';
import AppFooter from './_components/UI/AppFooter';
import AppHeader from './_components/UI/AppHeader';

export const metadata: Metadata = {
  title: 'BandVoting',
  description: 'Contextual Repertoire Voting List',
};

/**
 * SessionProvider (next-auth: https://next-auth.js.org/getting-started/example) is needed to expose session context ('useSession')
 * SessionProvider requires a client component
 * Root Layout is a server component
 * Provider is a helper component which utilizes 'use client'
 * side effects are all pages will be client side rendered
 */

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body>
        <Provider session={session}>
          <header>
            <AppHeader />
          </header>
          {children}
          <footer>
            <AppFooter />
          </footer>
        </Provider>
      </body>
    </html>
  );
}
