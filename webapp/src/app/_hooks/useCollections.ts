import { useCallback, useContext, useMemo } from 'react';
import { UserContext } from '../_context/client-user-provider';
import { IBand, IPlaylist } from '@domain/content';
import { useParams, usePathname, useSearchParams } from 'next/navigation';

export function useBandCollection() {
  const userContext = useContext(UserContext);
  const params = useParams();
  const bandId = params.uid;

  const currentBand = useMemo(
    () => (bandId && userContext?.myBands ? userContext.myBands.find(b => b.id === bandId) : null),
    [bandId, userContext]
  );

  const memberIds = currentBand?.memberIds ?? [];
  const members = currentBand?.members ?? [];

  const getMemberNameById = (id: string) => {
    return members?.find(m => m.id === id)?.name;
  };

  const isBandAdmin = userContext?.isAdmin;

  return { ...userContext, currentBand, members, memberIds, getMemberNameById, isBandAdmin };
}
