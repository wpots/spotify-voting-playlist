import { IUser } from '@domain/content';
import type { UserRecord } from 'firebase-admin/auth';

export default function userAdapter(dto: UserRecord): IUser {
  return {
    id: dto.uid,
    name: dto.displayName || dto.email!,
    photoUrl: dto.photoURL,
    isDisabled: dto.disabled,
    spotifyId: dto.customClaims?.['spotifyId'],
    isAdmin: dto.customClaims?.['admin'],
  };
}
