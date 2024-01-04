import { authOptions } from "@/utils/authentication/authOptions";
import { getServerSession } from "next-auth";

/**
 * Band Page where member can
 * add playlist
 * edit playlist
 * vote for songs in playlist
 *  - 5 star vote
 *  - veto vote
 *  - add comment
 * invite new members
 * revoke membership (with archive)
 *
 */
export default async function BandsPage() {
  const session = await getServerSession(authOptions);

  return <h1>Hello Bands page</h1>;
}
