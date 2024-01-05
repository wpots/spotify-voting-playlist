"use client";
import Tracklist from "../Tracks/TrackList";
import type { IPlaylist } from "@domain/playlist";
import PlaylistHeader from "./PlaylistHeader";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Track from "../Tracks/Track";
import type { ITrack } from "@domain/playlist";
import React, { useState } from "react";
import TrackControls from "../Tracks/TrackControls";
import VotingDetails from "../Votes/VotingDetails";
import VoteSummary from "../Votes/VoteSummary";

export default function Playlist({ playlist }: { playlist: IPlaylist }) {
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  const handlePlayback = (id: string, reset?: boolean) => {
    if (id === isPlaying) {
    } else {
      setIsPlaying(id);
    }
  };
  const tracks = playlist.tracks.items;
  return (
    <>
      <PlaylistHeader description={playlist.description} url={playlist.url} />

      {playlist.tracks.items?.length > 0 && (
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {tracks.map((track: ITrack, idx: number) => {
            return (
              <Track
                track={track}
                key={`track-${idx}`}
                divider={idx}
                controls={
                  <TrackControls
                    onPlayBack={(reset?: boolean) => handlePlayback(track.id, reset)}
                    isPlaying={isPlaying}
                  />
                }
              >
                <VoteSummary votes={track.votes} />
              </Track>
            );
          })}
        </List>
      )}
    </>
  );
}
