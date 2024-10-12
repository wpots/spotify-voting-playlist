'use client';
import SignInForm from '@/app/_components/Auth/SignInForm';
import Welcome from '@/app/_components/Auth/Welcome';
import { Container } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { PropsWithChildren } from 'react';
import AppBanner from '@/app/_components/UI/AppBanner';
import UnAuthorized from '@/app/_components/Auth/UnAuthorized';
import { getAuthSession } from '@/utils/authentication';

type PageProps = {
  searchParams?: {
    unauthorized?: boolean;
    returnTo?: string;
  };
};

function LoginWrapper({ children, redirect }: PropsWithChildren<{ redirect: boolean }>) {
  if (redirect) return <UnAuthorized>{children}</UnAuthorized>;
  return <Welcome>{children}</Welcome>;
}

export default function SignIn(props: Readonly<PageProps>) {
  // const session = await getAuthSession();
  // console.log('SESSION SIGNIN', session);
  const isRedirected = props.searchParams?.unauthorized || false;
  return (
    <>
      <AppBanner title='Members only...'></AppBanner>
      <Container maxWidth='sm' sx={{ pt: 2 }}>
        <Grid2 container>
          <Grid2 xs display='flex' justifyContent='center' alignItems='center'>
            <LoginWrapper redirect={isRedirected}>
              <SignInForm />
            </LoginWrapper>
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
}
