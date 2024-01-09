declare module '@domain/content' {
  interface IUser {
    id: string; // spotifyAccountId
    name: string;
    email: string;
    roles?: string[];
    image: string;
  }

  type IVoteItem = {
    trackId: string; // spotifyId
    userId: string;
    vote: string;
    comment?: string;
  };

  interface IVote {
    total: number;
    average: number;
    items: IVoteItem[];
  }

  interface ITrack {
    url: string;
    id: string;
    name: string;
    added_by: {
      href: string;
      id: string;
    };
    artists: string;
    votes?: IVote;
    [key]: any;
  }

  interface IPlaylist {
    description: string;
    external_urls: {
      spotify: string;
    };
    url: string;
    href: string;
    id: string;
    image: string;
    images: [
      {
        url: string;
        height: number;
        width: number;
      }
    ];
    name: string;
    tracks: {
      href?: string;
      limit?: number;
      next?: string;
      offset?: number;
      previous?: string;
      total?: number;
      items: ITrack[];
      refs?: string[];
      [key]: any;
    };
  }
  interface IBand {
    id: string;
    name: string;
    playlists?: string[] | IPlaylist[]; // first time in Content service before extending
    members: string[] | IUser[]; // first time in Content service before extending
    veterans?: IUser[];
  }
}
