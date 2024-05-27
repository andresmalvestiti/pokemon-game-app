'use client';
import { ThemeOptions, createTheme } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#ffcb05',
    },
    secondary: {
      main: '#e23724',
    },
    background: {
      default: '#f0f0f0',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
    },
  },
};

export const pokemonTheme = createTheme({
  ...themeOptions
});

// export const pokemonTheme = createTheme();