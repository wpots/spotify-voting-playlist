declare module '@domain/content' {
  type IVoteItem = {
    trackId: string; // spotifyId
    userId: string | null;
    rating?: number;
    comment?: string;
  };

  interface IVote {
    total: number;
    average: number;
    veto?: IVoteItem[];
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
    error?: any;
  }
  // DEPRECATED
  interface IUser {
    id: string; // spotifyAccountId
    name: string;
    email: string;
    roles?: string[];
    image?: string;
    vote?: IVoteItem;
    spotifyId: string;
  }

  // MOVE to service

  interface IUserData {
    myBands: Array<IBand>;
  }

  interface IBand {
    id: string;
    name: string;
    logo?: string;
    playlistIds?: string[];
    playlists?: IPlaylist[];
    memberIds: string[];
    members: IUser[];
    veterans?: IUser[];
    error?: any;
  }
  // MOVE to adapter
  interface IBandData {
    id: string;
    name: string;
    logo?: string;
    playlists?: string[];
    members: string[];
    veterans?: IUser[];
    error?: any;
  }

  interface IError {
    [key: string]: any;
  }
}
