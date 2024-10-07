import { useContext } from 'react';
import { UserContext } from '../_context/client-user-provider';
import { AuthContext } from '@/utils/authentication';
import { IBand, IPlaylist } from '@domain/content';

type UseUserOptions = {
  selectedBand?: IBand;
  selectedPlaylist?: IPlaylist;
  [key: string]: any;
};
export default function useUser(options?: UseUserOptions) {
  const userContext = useContext(UserContext);
  const authContext = useContext(AuthContext);

  return { ...userContext, auth: authContext.user, selectedPlaylist: options?.selectedPlaylist };
}
