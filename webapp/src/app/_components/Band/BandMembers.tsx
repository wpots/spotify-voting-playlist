'use client';
import React from 'react';
import { AvatarGroup, Avatar } from '@mui/material';
import './BandMembers.css';
import { IUser } from '@domain/content';
interface BandMembersProps {
  members: IUser[];
  action?: React.ReactNode;
  className?: string;
}
export default function BandMembers({ members, action, className }: BandMembersProps) {
  return (
    <AvatarGroup className={className}>
      {members.map(member => (
        <Avatar
          alt={member.id}
          src={member.image || `https://loremflickr.com/100/100/cat/?${member.id}`}
          key={`avatar-${member.id}`}
          sx={{ width: 24, height: 24 }}
        />
      ))}
      {action}
    </AvatarGroup>
  );
}
