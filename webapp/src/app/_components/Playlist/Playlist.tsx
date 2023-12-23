import Tracklist from "../Tracks/TrackList";
import type { ITrack } from "@domain/playlist";
/**
 * Playlist component has:
 * Title (child)
 * Href (child)
 * Tracks
 * AlbumArt? (child)
 */
interface IPlaylistProps {
  title: string;
  href: string;
  albumart: string;
  tracks: { items: ITrack[]; limit: number };
}

export default function Playlist({ playlist }: { playlist: IPlaylistProps }) {
  return playlist.tracks.items?.length > 0 && <Tracklist tracks={playlist.tracks.items} />;
}
