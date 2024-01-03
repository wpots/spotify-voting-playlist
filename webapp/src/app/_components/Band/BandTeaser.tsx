"use client";
import * as React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import * as FireStoreService from "@/utils/firebase/firebase.service";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import BandMembers from "./BandMembers";

interface BandTeaserProps {
  onCardClick: () => void;
  name: string;
  children: React.ReactNode;
}

export default function BandTeaser({ name, onCardClick, children }: BandTeaserProps) {
  const handleClick = (e: React.SyntheticEvent) => {
    onCardClick();
  };
  const members = ["0", "1", "2", "3", "4"];
  return (
    <Card sx={{ display: "flex" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {name}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          {children}
          <BandMembers members={members} />
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={`https://loremflickr.com/100/100/music?${divider}`}
        alt={name}
      />
    </Card>
  );
}
