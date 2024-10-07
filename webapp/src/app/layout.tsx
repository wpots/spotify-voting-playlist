import './globals.css';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import AppFooter from './_components/UI/AppFooter';
import AppHeader from './_components/UI/AppHeader';
import UserContextProvider from './_context/client-user-provider';
import CustomThemeProvider from './_context/client-theme-provider';
import { AuthContextProvider, getAuthSession } from '@/utils/authentication';
import { getContentByUserId } from '@/utils/content';

export const metadata: Metadata = {
  title: 'BandVoting',
  description: 'Contextual Repertoire Voting List',
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getAuthSession(cookies());

  const { myBands, isAdmin } = await getContentByUserId(session?.uid);

  const userProfile = {
    profile: session,
    ...(myBands && { myBands }),
    ...(isAdmin && { isAdmin }),
  };

  return (
    <html lang='en'>
      <body>
        <AuthContextProvider>
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
        </AuthContextProvider>
      </body>
    </html>
  );
}
