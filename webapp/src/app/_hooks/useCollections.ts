import { useCallback, useContext, useMemo } from 'react';
import { UserContext } from '../_context/client-user-provider';
import { IBand, IPlaylist } from '@domain/content';
import { useParams, useSearchParams } from 'next/navigation';

export function useBandCollection() {
  const userContext = useContext(UserContext);
  const params = useParams();

  const currentBand = useMemo(
    () => (params?.uid && userContext?.myBands ? userContext.myBands.find(b => b.id === params.uid) : null),
    [params, userContext]
  );

  const memberIds = currentBand?.memberIds ?? [];
  const members = currentBand?.members ?? [];

  return { ...userContext, currentBand, members, memberIds };
}
