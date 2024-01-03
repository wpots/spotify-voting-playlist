import * as FireStoreService from "@/utils/firebase/firebase.service";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const votingHandler = () => {
  const votes = FireStoreService.getAllVotes();
  return Response.json({ votes });
};

export { votingHandler as GET };
