import FireStoreService from "@/utils/firebase/firebase.service";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const votingHandler = (req: NextApiRequest) => {
  const accessToken = getToken({ req });
  if (!accessToken) return new Response("Unauthorized", { status: 400 });

  const votes = FireStoreService.getAllVotes();

  return Response.json({ votes });
};

export { votingHandler as GET };
