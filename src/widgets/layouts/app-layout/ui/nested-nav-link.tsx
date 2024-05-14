import { NavLink, useMatch } from 'react-router-dom';
import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import { NavLink as NavLinkProps } from '../lib/nav-links';

type NestedNavLinkProps = Pick<NavLinkProps, 'label' | 'routePath'>;

export function NestedNavLink({ label, routePath }: NestedNavLinkProps) {
  const match = useMatch({
    path: routePath?.fullPath ?? '',
    end: true,
  });
  const matches = !!match;

  return (
    <ListItem
      disablePadding
      dense
      component={NavLink}
      to={routePath?.fullPath ?? ''}
      sx={{
        color: 'black',
        '&:active': {
          color: 'black',
        },
        '& .MuiListItemButton-root': {
          paddingLeft: 2,
          paddingRight: 2,
        },
        '& .MuiListItemIcon-root': {
          minWidth: 25,
          marginRight: 2,
        },
        '& .Mui-selected': {
          bgcolor: 'lightgray !important',
        },
      }}
    >
      <ListItemButton selected={matches}>
        <ListItemIcon>
          <Box
            sx={{
              ml: 1,
              width: 6,
              height: 6,
              borderRadius: '50%',
            }}
            bgcolor={matches ? 'primary.main' : 'secondary.main'}
          />
        </ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </ListItem>
  );
}
