import { styled } from '@mui/material';

import { AppLogoComponent } from 'shared/assets/images';

export const CenteredAppLogo = styled(AppLogoComponent)(() => ({
  position: 'absolute',
  bottom: 24,
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 0,
  // [theme.breakpoints.down('md')]: {
  //   display: 'none',
  // },
}));
