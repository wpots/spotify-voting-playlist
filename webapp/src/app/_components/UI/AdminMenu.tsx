'use client';
import { Avatar, MenuItem, Divider, ListItemIcon, ListSubheader } from '@mui/material';

import { IBand, IUser } from '@domain/content';

export default function AdminMenu({ currentBand }: { currentBand: IBand }) {
  const members = currentBand.members as IUser[];

  return (
    <>
      {currentBand && <ListSubheader>{currentBand.name}</ListSubheader>}
      {members.map((m: IUser) => {
        return (
          <MenuItem key={m.id} href={`/bands/${currentBand.id}/member/${m.id}`} component='a'>
            <ListItemIcon>
              <Avatar src={m.image} sx={{ width: 24, height: 24 }} />
            </ListItemIcon>
            {m.name || m.id}
          </MenuItem>
        );
      })}
      {<Divider />}
    </>
  );
}
