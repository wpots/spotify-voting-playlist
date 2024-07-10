'use client';
import { IPlaylist } from '@domain/content';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Tab } from '@mui/material';
import { useEffect, useState } from 'react';
import Playlist from './Playlist';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { teal } from '@mui/material/colors';

export default function PlaylistTabs({ playlists }: { playlists: IPlaylist[] }) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const defaultPlaylist = playlists[0].id;
  const [activePlaylistId, setActivePlaylistId] = useState(searchParams.get('playlist') || defaultPlaylist);

  useEffect(() => {
    if (activePlaylistId) {
      router.push(`${pathName}?playlist=${activePlaylistId}`);
    }
  }, [activePlaylistId, pathName, router]);

  const handleOnChange = (e: React.SyntheticEvent, val: string) => {
    setActivePlaylistId(val);
  };
  return (
    <Box sx={{ width: '100%', maxWidth: '900px', margin: 'auto', bgcolor: teal[900] }}>
      {activePlaylistId && (
        <TabContext value={activePlaylistId}>
          {
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleOnChange} variant='scrollable' scrollButtons='auto'>
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
      )}
    </Box>
  );
}
