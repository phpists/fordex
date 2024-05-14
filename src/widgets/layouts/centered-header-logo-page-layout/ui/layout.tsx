import { ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material';

import { CenteredLogoHeader } from './centered-logo-header';
import { PageContent } from './page-content';
import { CenteredAppLogo } from './centered-app-logo';
import { LayoutWrapper } from './layout-wrapper';

interface CenteredHeaderLogoPageLayoutProps {
  wrapperSx?: SxProps<Theme>;
  headerSx?: SxProps<Theme>;
  pageContentSx?: SxProps<Theme>;
  children: ReactNode;
}

export function CenteredHeaderLogoPageLayout({
  children,
  headerSx,
  pageContentSx,
  wrapperSx,
}: CenteredHeaderLogoPageLayoutProps) {
  return (
    <LayoutWrapper component="main" sx={wrapperSx}>
      <CenteredLogoHeader sx={headerSx} />
      <PageContent sx={pageContentSx}>{children}</PageContent>
      <CenteredAppLogo />
    </LayoutWrapper>
  );
}
