import * as ContentService from '@/utils/content/content.service';
import * as FireStoreService from '@/utils/firebase/firebase.service';
import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const votingHandler = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const playlistIds = JSON.parse(searchParams.get('playlists') as string);
  const memberIds = JSON.parse(searchParams.get('members') as string);
  const votes = await ContentService.getUpdatedPlaylists(memberIds, playlistIds);
  return Response.json(votes);
};

export { votingHandler as GET };
