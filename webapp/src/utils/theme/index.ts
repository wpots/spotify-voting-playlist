'use client';
import { Figtree } from 'next/font/google';
import { createTheme, useMediaQuery } from '@mui/material';
import { teal } from '@mui/material/colors';

const bodyFont = Figtree({ subsets: ['latin'], display: 'swap' });

export const myThemeOptions = {
  palette: {
    primary: teal,
  },
  typography: {
    fontFamily: bodyFont.style.fontFamily,
  },
};
const preferDark = useMediaQuery('(prefers-color-scheme: dark)');
const theme = createTheme({
  ...myThemeOptions,
});

export default theme;
