import { useContext } from 'react';
import { UserContext } from '../_context/client-user-provider';
import { IBand, IPlaylist } from '@domain/content';

type UseContentOptions = {
  [key: string]: any;
};
export default function useContent(options?: UseContentOptions) {
  if (!UserContext) {
    throw new Error('React Context is unavailable in Server Components');
  }

  const userContext = useContext(UserContext);

  return { ...userContext };
}
