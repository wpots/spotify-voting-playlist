declare module "@firebase/api" {
  interface User {
    id: string; // spotifyAccountId
    name: string;
    memberships: string[];
  }
  interface Band {
    id: string; // random
    name: string;
    playlists: string[];
  }
  interface Vote {
    trackId: string; // spotifyId
    userId: string;
    vote: number;
    comment?: string;
  }
}
