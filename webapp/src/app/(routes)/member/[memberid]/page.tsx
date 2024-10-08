import AppBanner from '@/app/_components/UI/AppBanner';

interface BandPageProps {
  params: { memberid: string };
}

export default function MemberPage({ params }: BandPageProps) {
  return (
    <>
      <AppBanner title='hello' />
    </>
  );
}
