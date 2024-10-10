import './globals.css';
import type { Metadata } from 'next';

import AppFooter from './_components/UI/AppFooter';
import AppHeader from './_components/UI/AppHeader';
import UserContextProvider from './_context/client-user-provider';
import CustomThemeProvider from './_context/client-theme-provider';
import { getAuthSession } from '@/utils/authentication';
import { AuthContextProvider } from '@/utils/authentication/ui';
import { getDataByUserId } from '@/utils/collections';

export const metadata: Metadata = {
  title: 'BandVoting',
  description: 'Contextual Repertoire Voting List',
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getAuthSession();
  const userData = session.currentUser?.uid ? await getDataByUserId(session?.currentUser?.uid) : null;

  return (
    <html lang='en'>
      <body>
        <AuthContextProvider>
          <UserContextProvider data={userData}>
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
        </AuthContextProvider>
      </body>
    </html>
  );
}
