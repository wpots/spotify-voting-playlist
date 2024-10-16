import { useCallback, useContext, useMemo } from 'react';
import { UserContext } from '../_context/client-user-provider';
import { IBand, IPlaylist } from '@domain/content';
import { useParams, usePathname, useSearchParams } from 'next/navigation';

export function useBandCollection() {
  const userContext = useContext(UserContext);
  const params = useParams();
  const bandId = params.uid;

  const currentBand = useMemo(() => {
    if (userContext?.myBands && userContext?.myBands.length > 0) {
      if (userContext.myBands.length === 1) return userContext.myBands[0];
      if (bandId) return userContext.myBands.find(b => b.id === bandId);
    }
  }, [bandId, userContext]);

  const memberIds = currentBand?.memberIds ?? [];
  const members = currentBand?.members ?? [];

  const getMemberNameById = (id: string) => {
    return members?.find(m => m.id === id)?.name;
  };

  const isBandAdmin = userContext?.isAdmin;

  return { ...userContext, currentBand, members, memberIds, getMemberNameById, isBandAdmin };
}
