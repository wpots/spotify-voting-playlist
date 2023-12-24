import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const votingHandler = (req:NextApiRequest, res:NextApiResponse) => {
  const accessToken = getToken({ req });
  console.log("set voting");
};

export default votingHandler;
