import SignInForm from '@/app/_components/Auth/SignInForm';
import Welcome from '@/app/_components/Auth/Welcome';
import UnAuthenticated from '@/app/_components/Auth/UnAuthenticated';
import { Container } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { PropsWithChildren } from 'react';
import AppBanner from '@/app/_components/UI/AppBanner';

type PageProps = {
  searchParams?: {
    unauthenticated?: boolean;
    returnTo?: string;
  };
};
export default function SignIn(props: PageProps) {
  function LoginWrapper({ children }: PropsWithChildren) {
    if (props.searchParams?.unauthenticated) return <UnAuthenticated>{children}</UnAuthenticated>;
    return <Welcome>{children}</Welcome>;
  }

  return (
    <>
      <AppBanner title='Sorry, members only...'></AppBanner>
      <Container maxWidth='sm' sx={{ pt: 2 }}>
        <Grid2 container>
          <Grid2 xs display='flex' justifyContent='center' alignItems='center'>
            <LoginWrapper>
              <SignInForm />
            </LoginWrapper>
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
}
