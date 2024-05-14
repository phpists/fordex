import { AppBar, Box, SxProps, Theme, Toolbar, styled } from '@mui/material';

const AppHeader = styled(AppBar)({
  background: 'white',
  color: 'black',
});

interface CenteredLogoHeaderProps {
  sx: SxProps<Theme> | undefined;
}

export function CenteredLogoHeader({ sx }: CenteredLogoHeaderProps) {
  return (
    <AppHeader position="static" elevation={0} sx={sx}>
      <Toolbar>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="100%"
        >
          <Box
            component="img"
            src="/client-company-logo.png"
            alt="Company Logo"
            maxHeight={{ xs: 56, md: 64 }}
            sx={{
              objectFit: 'contain',
              height: '100%',
            }}
          />
        </Box>
      </Toolbar>
    </AppHeader>
  );
}
