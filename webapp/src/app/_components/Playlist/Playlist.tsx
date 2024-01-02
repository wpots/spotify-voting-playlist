import Tracklist from "../Tracks/TrackList";
import type { IPlaylist } from "@domain/playlist";
/**
 * Playlist component has:
 * Title (child)
 * Href (child)
 * Tracks
 * AlbumArt? (child)
 */

export default function Playlist({ playlist }: { playlist: IPlaylist }) {
  return playlist.tracks.items?.length > 0 && <Tracklist tracks={playlist.tracks.items} />;
}
