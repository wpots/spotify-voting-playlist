import AdminEdit from '@/app/_components/Auth/AdminEdit';
import ProfileEdit from '@/app/_components/Auth/ProfileEdit';
import AppBanner from '@/app/_components/UI/AppBanner';
import { getAuthSession } from '@/utils/authentication';
import { Container, Stack } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';

interface BandPageProps {
  params: { id: string };
}

export default async function MemberPage({ params }: BandPageProps) {
  const { currentUser } = await getAuthSession();
  return (
    <>
      <AppBanner title='Coming Soon' subTitle={`your profile name: ${currentUser?.displayName}` || undefined} />
      {currentUser?.uid && (
        <Container>
          <Grid2 container>
            <Grid2 xs display='flex' justifyContent='center' alignItems='center'>
              <Stack spacing={4}>
                <ProfileEdit />
                {currentUser.uid && <AdminEdit />}
              </Stack>
            </Grid2>
          </Grid2>
        </Container>
      )}
    </>
  );
}
