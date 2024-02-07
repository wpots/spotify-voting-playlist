declare module '@spotify/webapi' {
  interface PlaylistResponse {
    error: any;
    description: string;
    external_urls: {
      spotify: string;
    };
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
      href: string;
      limit: number;
      next: string;
      offset: number;
      previous: string;
      total: number;
      items: [
        {
          added_by: {
            href: string;
            id: string;
          };
          track: {
            artists: [
              {
                name: string;
              }
            ];
            external_urls: {
              spotify: string;
            };
            id: string;
            name: string;
          };
        }
      ];
    };
  }
}
