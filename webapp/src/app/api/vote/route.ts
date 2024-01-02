import FireStoreService from "@/utils/firebase/firebase.service";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const votingHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const accessToken = getToken({ req });
  const payload = req.body;
  console.log("set voting", accessToken);

  const voted = FireStoreService.setVote("wietekeozturk", payload);
};

export default votingHandler;
