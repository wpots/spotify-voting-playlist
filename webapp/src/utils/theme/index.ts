'use client';
import { Figtree } from 'next/font/google';
import { createTheme } from '@mui/material';

const bodyFont = Figtree({ subsets: ['latin'], display: 'swap' });

const theme = createTheme({
  typography: {
    fontFamily: bodyFont.style.fontFamily,
  },
});

export default theme;
