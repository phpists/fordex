import {
  createTheme,
  CssBaseline,
  ThemeProvider as MUIThemeProvider,
} from '@mui/material';
import { ReactNode } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
}

const DEFAULT_THEME = createTheme({
  palette: {
    primary: {
      main: '#5245E5',
    },
    secondary: {
      main: '#626262',
    },
    text: {},
  },
});

export const ThemeProvider = ({ children }: ThemeProviderProps) => (
  <MUIThemeProvider theme={DEFAULT_THEME}>
    <CssBaseline />
    {children}
  </MUIThemeProvider>
);
