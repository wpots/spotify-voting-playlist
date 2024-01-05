import * as FireStoreService from "@/utils/firebase/firebase.service";
import { NextRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
/**
 * example url: vote/4gzbery6ikdnxr
 *
 *
 */
const votingHandler = async (req: NextRequest, { params }: { params: { trackId: string } }) => {
  const accessToken = await getToken({ req });
  if (!accessToken) return new Response("Unauthorized", { status: 401 });
  const trackId = params.trackId;
  if (req.method === "POST") {
    const searchParams = req.nextUrl.searchParams;
    const vote = searchParams.get("vote");
    const payload = { trackId, userId: "wietekeozturk", vote }; //todo dynamix userId

    const voted = await FireStoreService.setVote(payload);
    return Response.json({ voted });
  } else if (req.method === "GET") {
    const trackVotes = await FireStoreService.getVotesByTrackId(trackId);
    return Response.json({ trackVotes });
  } else {
    return new Response("Method Not Allowed", { status: 405 });
  }
};

export { votingHandler as POST };
