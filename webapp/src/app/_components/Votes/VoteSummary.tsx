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
import useUser from "@/app/_hooks/useUser";

export default function VoteSummary({ votes }: { votes: IVote[] }) {
  const currentUser = useUser();
  const userId = currentUser?.userInfo.id;
  const bandMembers = currentUser?.currentBand?.members;

  const membersVoted = votes.reduce((acc, cv) => {
    if (!acc.includes(cv.userId)) acc.push(cv.userId);
    return acc;
  }, [] as string[]);

  votesMapper.unshiftCurrentUser(userId, membersVoted);
  const membersPending = bandMembers?.filter(member => {
    return !membersVoted.includes(member.id);
  });

  votesMapper.unshiftCurrentUser(userId, membersPending);

  return (
    <>
      <Stack spacing={1} alignItems="end">
        <Rating
          sx={{ color: "#ff3d47" }}
          name="read-only"
          readOnly
          defaultValue={0}
          precision={1}
          max={5}
          icon={<FavoriteIcon fontSize="inherit" />}
          emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
        />
        {membersVoted?.length > 0 && <BandMembers members={membersVoted}></BandMembers>}
        {membersVoted?.length > 0 || (membersPending?.length > 0 && <>/</>)}
        {membersPending?.length > 0 && <BandMembers members={membersPending}></BandMembers>}
        {}
      </Stack>
    </>
  );
}
