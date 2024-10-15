import ProfileEdit from '@/app/_components/Auth/ProfileEdit';
import AppBanner from '@/app/_components/UI/AppBanner';
import { getAuthSession } from '@/utils/authentication';

interface BandPageProps {
  params: { memberid: string };
}

export default function MemberPage({ params }: BandPageProps) {
  const { currentUser } = await getAuthSession();
  return (
    <>
      <AppBanner title='Coming Soon' />
      {currentUser?.uid && <ProfileEdit />}
    </>
  );
}
