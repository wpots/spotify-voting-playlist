declare module "firebase" {
  interface User {
    id: string; // spotifyAccountId
    name: string;
    memberships: string[];
    comments: Record<string, any>;
  }
  interface Band {
    id: string; // random
    name: string;
    playlists: string[];
    members: string[];
  }
  interface Track {
    id: string; // spotifyId
  }
}
