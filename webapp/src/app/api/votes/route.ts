import * as ContentService from '@/utils/content/content.service';
import * as FireStoreService from '@/utils/firebase/firebase.service';
import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const votingHandler = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const trackIds = JSON.parse(searchParams.get('trackIds') as string);
  const memberIds = JSON.parse(searchParams.get('members') as string);
  const votes = await ContentService.fetchVotes(trackIds, memberIds);
  return Response.json(votes);
};

export { votingHandler as GET };
