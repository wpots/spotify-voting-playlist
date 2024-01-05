import { useContext } from "react";
import { UserContext } from "../_context/client-user-provider";
type UseUserOptions = {
  [key: string]: any;
};
export default function useUser(options: UseUserOptions) {
  if (!UserContext) {
    throw new Error("React Context is unavailable in Server Components");
  }
  const userContext = useContext(UserContext);
  return userContext;
}
