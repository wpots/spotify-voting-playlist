import './globals.css';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import Provider from '@/app/_context/client-session-provider';
import * as ContentService from '@/utils/content/content.service';
import { authOptions } from '@/utils/authentication/authOptions';
import AppFooter from './_components/UI/AppFooter';
import AppHeader from './_components/UI/AppHeader';
import UserContextProvider from './_context/client-user-provider';
import { IBand } from '@domain/content';
import CustomThemeProvider from './_context/client-theme-provider';

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

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions);

  const userId = session?.user?.id;
  let userBands: IBand[] | undefined;

  if (userId) {
    // Additional computations are done in hook
    userBands = await ContentService.getBandsByUserId(userId);
  }

  const userProfile = {
    userInfo: session?.user,
    userBands,
  };
  return (
    <html lang='en'>
      <body>
        <Provider session={session}>
          <UserContextProvider userProfile={userProfile}>
            <CustomThemeProvider>
              <header>
                <AppHeader />
              </header>
              {children}
              <footer>
                <AppFooter />
              </footer>
            </CustomThemeProvider>
          </UserContextProvider>
        </Provider>
      </body>
    </html>
  );
}
