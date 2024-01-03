"use client";

import { AvatarGroup, Avatar } from "@mui/material";

export default function BandMembers({ members }: { members: string[] }) {
  return (
    <AvatarGroup>
      {members.map((member, idx) => (
        <Avatar
          src={`https://loremflickr.com/100/100/cat/?${idx}`}
          key={`avatar-${idx}`}
          sx={{ width: 24, height: 24 }}
        />
      ))}
    </AvatarGroup>
  );
}
