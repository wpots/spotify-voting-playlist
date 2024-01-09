'use client';
import { IPlaylist } from '@domain/content';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Tab } from '@mui/material';
import { useEffect, useState } from 'react';
import Playlist from './Playlist';
import useUser from '@/app/_hooks/useUser';
import { useSearchParams } from 'react-router-dom';

export default function PlaylistTabs({ playlists }: { playlists: IPlaylist[] }) {
  const [activePlaylist, setActivePlaylist] = useState(playlists?.[0]?.id);

  // const [searchParams, setSearchParams] = useSearchParams();

  // useEffect(() => {
  //   if (searchParams.get('playlist') !== activePlaylist) {
  //     const params = new URLSearchParams({ playlist: activePlaylist });
  //     setSearchParams(params);
  //   }
  // }, [activePlaylist, searchParams]);

  const handleOnChange = (e: React.SyntheticEvent, val: string) => {
    setActivePlaylist(val);
  };
  return (
    <Box sx={{ width: '100%', maxWidth: '900px', margin: 'auto' }}>
      <TabContext value={activePlaylist}>
        {
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleOnChange}>
              {playlists.map((list: IPlaylist) => {
                return <Tab label={list.name} value={list.id} key={list.id}></Tab>;
              })}
            </TabList>
          </Box>
        }
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
