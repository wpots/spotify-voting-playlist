import List from "@mui/material/List";

import Divider from "@mui/material/Divider";

import Track from "../Tracks/Track";
import type { ITrack } from "@domain/playlist";

export default function Tracklist({ tracks }: { tracks: ITrack[] }) {
  return (
    <List sx={{ width: "100%", maxWidth: 600, bgcolor: "background.paper" }}>
      {tracks.map((track: ITrack, idx: number) => {
        return (
          <>
            {idx !== 0 && <Divider variant="inset" component="li" />} <Track track={track} key={idx}></Track>
          </>
        );
      })}
    </List>
  );
}
