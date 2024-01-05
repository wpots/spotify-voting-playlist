"use client";
import React, { useState } from "react";
import List from "@mui/material/List";
import PlaylistHeader from "./PlaylistHeader";
import Track from "../Tracks/Track";
import VoteSummary from "../Votes/VoteSummary";
import type { IPlaylist, ITrack } from "@domain/playlist";
import useUser from "@/app/_hooks/useUser";
// import TrackControls from "../Tracks/TrackControls";

export default function Playlist({ playlist }: { playlist: IPlaylist }) {
  // const [playId, setPlayId] = useState<string | null>(null);

  // const handlePlayback = (id: string, reset?: boolean) => {
  //   if (id === playId) {
  //     if (reset) {
  //       // api call spotify to reset playhead to zero
  //     } else {
  //       // api call spotify to pause
  //     }
  //     setPlayId(null);
  //   } else {
  //     setPlayId(id);
  //     // api call spotify to play
  //   }
  // };
  const tracks = playlist.tracks.items;

  return (
    <>
      <PlaylistHeader description={playlist.description} url={playlist.url} />

      {playlist.tracks.items?.length > 0 && (
        <List sx={{ width: "100%", bgcolor: "background.paper", border: "1px solid lightgrey" }}>
          {tracks.map((track: ITrack, idx: number) => {
            return (
              <Track
                track={track}
                key={`track-${idx}`}
                divider={idx}
                // controls={
                //   <TrackControls
                //     onPlayBack={(reset?: boolean) => handlePlayback(track.id, reset)}
                //     isPlaying={track.id === playId}
                //   />
                // }
              >
                {track?.votes && track.votes.length > 0 && <VoteSummary votes={track.votes} />}
              </Track>
            );
          })}
        </List>
      )}
    </>
  );
}
