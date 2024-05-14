import { Stack, styled } from '@mui/material';

export const PageContent = styled(Stack)(({ theme }) => ({
  width: '100%',
  height: '100%',
  padding: `${theme.spacing(8)} ${theme.spacing(2)}`,
  zIndex: 1,
  [theme.breakpoints.down('md')]: {
    padding: 0,
  },
}));
