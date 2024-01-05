"use client";

import { AvatarGroup, Avatar } from "@mui/material";
import React from "react";

export default function BandMembers({ members, action }: { members: string[]; action?: React.ReactNode }) {
  return (
    <AvatarGroup>
      {members.map((member, idx) => (
        <Avatar
          src={`https://loremflickr.com/100/100/cat/?${idx}`}
          key={`avatar-${idx}`}
          sx={{ width: 24, height: 24 }}
        />
      ))}
      {action}
    </AvatarGroup>
  );
}
