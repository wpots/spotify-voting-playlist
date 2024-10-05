import LoginScreen from '@/app/_components/Auth/LoginScreen';
import { Container } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Welcome from '@/app/_components/Auth/Welcome';
import UnAuthenticated from '@/app/_components/Auth/UnAuthenticated';
import { PropsWithChildren } from 'react';

type PageProps = {
  searchParams?: {
    unauthenticated?: boolean;
    continueUrl?: string;
  };
};
export default function SignIn(props: PageProps) {
  function LoginWrapper({ children }: PropsWithChildren) {
    if (props.searchParams?.unauthenticated) return <UnAuthenticated>{children}</UnAuthenticated>;
    return <Welcome>{children}</Welcome>;
  }

  return (
    <Container maxWidth='sm'>
      <Grid2 container>
        <Grid2 xs display='flex' justifyContent='center' alignItems='center'>
          <LoginWrapper>
            <LoginScreen continueUrl={props.searchParams?.continueUrl} />
          </LoginWrapper>
        </Grid2>
      </Grid2>
    </Container>
  );
}
