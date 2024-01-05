"use client";
import * as React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Button, IconButton, Typography } from "@mui/material";
import BandMembers from "../Band/BandMembers";
import MoreIcon from "@mui/icons-material/More";
import { IVote } from "@domain/playlist";
import votesMapper from "@/utils/votes/votes.mapper";

export default function VoteSummary({ votes, members }: { votes: IVote[]; members: string[] }) {
  const isCurrentUser = "gerhsht";
  const membersVoted = votes.reduce((acc, cv) => {
    if (!acc.includes(cv.userId)) acc.push(cv.userId);
    return acc;
  }, [] as string[]);

  votesMapper.unshiftCurrentUser(isCurrentUser, membersVoted);
  const membersPending = members?.filter(member => {
    return !membersVoted.includes(member);
  });

  votesMapper.unshiftCurrentUser(isCurrentUser, membersPending);

  return (
    <>
      <Stack spacing={1} alignItems="end">
        <Rating
          sx={{ color: "#ff3d47" }}
          name="half-rating"
          defaultValue={0}
          precision={1}
          max={5}
          icon={<FavoriteIcon fontSize="inherit" />}
          emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
        />
        {membersVoted?.length > 0 && <BandMembers members={membersVoted}></BandMembers>}
        {membersVoted?.length > 0 && membersPending?.length > 0 && <>/</>}
        {membersPending?.length > 0 && <BandMembers members={membersVoted}></BandMembers>}
        {}
      </Stack>
    </>
  );
}
