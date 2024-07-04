'use client';
import { Figtree } from 'next/font/google';
import { createTheme } from '@mui/material';
import { teal, green } from '@mui/material/colors';

const bodyFont = Figtree({ subsets: ['latin'], display: 'swap' });

const theme = createTheme({
  palette: {
    primary: teal,
  },
  typography: {
    fontFamily: bodyFont.style.fontFamily,
  },
  components: {},
});

export default theme;
