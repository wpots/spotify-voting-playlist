import * as FireStoreService from '@/utils/firebase/firebase.service';
import { getToken } from 'next-auth/jwt';
/**
 * example url: vote/4gzbery6ikdnxr
 *
 */
const votingHandler = async (req: any, { params }: { params: { trackId: string } }) => {
  const accessToken = await getToken({ req });
  if (!accessToken) return new Response('Unauthorized', { status: 401 });
  const trackId = params.trackId;
  const searchParams = req.nextUrl.searchParams;
  const vote = searchParams.get('vote');
  const payload = { trackId, userId: accessToken.id as string, vote }; //todo dynamix userId

  const voted = await FireStoreService.setVote(payload);
  return Response.json({ voted });
};

export { votingHandler as POST };
