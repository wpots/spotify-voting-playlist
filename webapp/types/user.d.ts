declare module "@domain/user" {
  interface IUser {
    id: string; // spotifyAccountId
    name: string;
    email: string;
    roles?: string[];
    image: string;
  }
}
