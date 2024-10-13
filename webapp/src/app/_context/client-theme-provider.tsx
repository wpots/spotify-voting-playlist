'use client';

import React from 'react';
import { Figtree } from 'next/font/google';
import { createTheme, useMediaQuery, ThemeProvider } from '@mui/material';
import { teal } from '@mui/material/colors';
// https://mui.com/material-ui/customization/color/

const bodyFont = Figtree({ subsets: ['latin'], display: 'swap', preload: false });

export default function CustomThemeProvider({ children }: { children: React.ReactNode }): React.ReactNode {
  const preferDark = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = createTheme({
    palette: {
      mode: preferDark ? 'dark' : 'light',
      primary: teal,
    },
    typography: {
      fontFamily: bodyFont.style.fontFamily,
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
