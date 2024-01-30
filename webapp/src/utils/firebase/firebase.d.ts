import { Query } from 'firebase/firestore';

declare module '@firebase/api' {
  interface User {
    id: string; // spotifyAccountId
    name: string;
    email: string;
    roles?: string[];
    image: string;
  }
  interface Band {
    id: string;
    name: string;
    playlists: string[];
    members: string[];
    veterans: string[];
  }
  interface Vote {
    trackId: string; // spotifyId
    userId: string;
    vote?: number; // old legacy
    rating?: string;
    comment?: string;
  }
}
