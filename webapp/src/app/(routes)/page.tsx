import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import LoginButton from "../_components/Auth/LoginButton";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session)
    return (
      <main>
        Your are not logged in....<LoginButton>Log in now</LoginButton>
      </main>
    );
  return (
    <main>
      <small>you are logged in</small>
    </main>
  );
}
