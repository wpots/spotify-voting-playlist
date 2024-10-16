declare module '@domain/content' {
  type IVoteItem = {
    trackId: string;
    userId: string | null;
    rating?: number;
    comment?: string;
  };

  interface IVote {
    total: number;
    average: number;
    veto?: Array<IVoteItem>;
    items: Array<IVoteItem>;
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
      items: Array<ITrack>;
      refs?: Array<string>;
      [key]: any;
    };
    error?: any;
  }

  // MOVE to service
  interface IUserData {
    myBands: Array<IBand>;
    isAdmin?: boolean;
  }

  interface IUser {
    id: string;
    name: string;
    photoUrl?: string;
    disabled: boolean;
  }
  interface IBand {
    id: string;
    name: string;
    logo?: string;
    playlistIds?: Array<string>;
    playlists?: Array<IPlaylist>;
    memberIds?: Array<string>;
    members?: Array<IUser>;
    error?: any;
  }
  // MOVE to adapter
  interface IBandData {
    id: string;
    name: string;
    playlists?: Array<string>;
    members: Array<string>;
    veterans?: Array<string>;
    error?: any;
  }

  interface IError {
    [key: string]: any;
  }
}
