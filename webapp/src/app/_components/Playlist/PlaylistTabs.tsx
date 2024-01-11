'use client';
import { IPlaylist } from '@domain/content';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Tab } from '@mui/material';
import { useEffect, useState } from 'react';
import Playlist from './Playlist';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function PlaylistTabs({ playlists }: { playlists: IPlaylist[] }) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const [activePlaylist, setActivePlaylist] = useState(searchParams.get('playlist'));

  useEffect(() => {
    if (activePlaylist) {
      router.push(`${pathName}?playlist=${activePlaylist}`);
    }
  }, [activePlaylist, pathName, router]);

  const handleOnChange = (e: React.SyntheticEvent, val: string) => {
    setActivePlaylist(val);
  };
  return (
    <Box sx={{ width: '100%', maxWidth: '900px', margin: 'auto' }}>
      {activePlaylist && (
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
      )}
    </Box>
  );
}
