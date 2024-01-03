"use client";
import * as React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import * as FireStoreService from "@/utils/firebase/firebase.service";

export default function BandTeaser({ onSetVote }: { onSetVote: Function }) {
  const handleVote = (e: React.SyntheticEvent, value: number | null) => {
    onSetVote(value);
  };
  return (
    <Stack spacing={1}>
      <Rating
        sx={{ color: "#ff3d47" }}
        name="half-rating"
        defaultValue={0}
        precision={1}
        max={5}
        icon={<FavoriteIcon fontSize="inherit" />}
        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
        onChange={handleVote}
      />
    </Stack>
  );
}
