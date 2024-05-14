import { ReactNode, useMemo, useState } from 'react';
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { DESKTOP_DRAWER_WIDTH, MOBILE_DRAWER_WIDTH } from '../lib/constants';
import { NavLinks } from './nav-links';
import { useAppLayoutStore } from '../model/use-app-layout-store';
import { HeaderContentNodes } from './header-content-nodes';

export interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const pageName = useAppLayoutStore((store) => store.pageName);
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const DRAWER_WIDTH = useMemo(
    () => (isTablet ? MOBILE_DRAWER_WIDTH : DESKTOP_DRAWER_WIDTH),
    [isTablet]
  );

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <Box>
      <Toolbar
        sx={(theme) => ({
          [theme.breakpoints.up('xs')]: {
            px: 2,
          },
        })}
      >
        <Box
          component="img"
          src="/client-company-logo.png"
          alt="Company Logo"
          maxHeight={{ xs: 56, md: 64 }}
          margin="0 auto"
          sx={{
            objectFit: 'contain',
            height: '100%',
          }}
        />
      </Toolbar>
      <Divider />
      <NavLinks onClick={() => setMobileOpen(false)} />
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <AppBar
        position="fixed"
        sx={{
          background: 'white',
          color: 'black',
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
          boxShadow: 'none',
        }}
      >
        <Toolbar>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Box display="flex" alignItems="center">
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                {pageName}
              </Typography>
            </Box>
            <Box
              display="flex"
              gap={{ xs: 1, lg: 2 }}
              alignItems="center"
              flexDirection="row-reverse"
            >
              <HeaderContentNodes />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
        aria-label="links"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Stack
        component="main"
        sx={{
          flexGrow: 1,
          width: { xs: '100%', md: `calc(100% - ${DRAWER_WIDTH}px)` },
          height: '100%',
        }}
      >
        <Toolbar />
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          {children}
        </Box>
      </Stack>
    </Box>
  );
}
