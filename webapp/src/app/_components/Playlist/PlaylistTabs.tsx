'use client';
import { IPlaylist } from '@domain/content';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Tab } from '@mui/material';
import { useState } from 'react';
import Playlist from './Playlist';

export default function PlaylistTabs({ playlists }: { playlists: IPlaylist[] }) {
  const [value, setValue] = useState(playlists?.[0]?.id || '6F9aPJmG7lCIyz38NSA33q'); //TODO id of undefined
  const handleOnChange = (e: React.SyntheticEvent, val: string) => {
    setValue(val);
  };
  return (
    <Box sx={{ width: '100%', maxWidth: '900px', margin: 'auto' }}>
      <TabContext value={value}>
        {playlists.length > 1 && (
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleOnChange}>
              {playlists.map((list: IPlaylist) => {
                return <Tab label={list.name} value={list.id} key={list.id}></Tab>;
              })}
            </TabList>
          </Box>
        )}
        {playlists.map((list: IPlaylist) => {
          return (
            <TabPanel value={list.id} key={list.id}>
              <Playlist playlist={list} />
            </TabPanel>
          );
        })}
      </TabContext>
    </Box>
  );
}
