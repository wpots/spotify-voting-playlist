declare module "@domain/playlist" {
  interface ITrack {
    id: string;
    name: string;
    href: string;
    artists: Record<string, any>[];
  }
  interface IPlaylist {
    description: string;
    external_urls: {
      spotify: string;
    };
    url: string;
    href: string;
    id: string;
    images: [
      {
        url: string;
        height: number;
        width: number;
      }
    ];
    name: string;
    tracks: {
      [key]: any;
      href: string;
      limit: number;
      next: string;
      offset: number;
      previous: string;
      total: number;
      items: [
        {
          url: string;
          added_by: {
            href: string;
            id: string;
          };
          artists: [
            {
              name: string;
            }
          ];
          id: string;
          name: string;
          [key]: any;
        }
      ];
    };
  }
}
