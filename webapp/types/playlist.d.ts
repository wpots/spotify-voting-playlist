declare module "@domain/playlist" {
  interface IVote {
    trackId: string; // spotifyId
    userId: string;
    vote: number;
    comment?: string;
  }

  interface ITrack {
    url: string;
    id: string;
    name: string;
    added_by?: {
      href: string;
      id: string;
    };
    artists: [
      {
        name: string;
      }
    ];
    votes?: IVote[];
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
}
