import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Fragment, useState } from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { NavLink, useMatch } from 'react-router-dom';

import { ACTIONS, NavLink as NavLinkProps } from '../lib/nav-links';
import { NestedNavLink } from './nested-nav-link';
import { EditProfileForm } from 'widgets/edit-profile-form/ui/edit-profile-form';

export function NavLinkItem({
  icon: Icon,
  label,
  routePath,
  nestedLinks,
  action,
}: NavLinkProps) {
  const [editModal, setEditModal] = useState(false);
  const match = useMatch({
    path: routePath?.fullPath ?? '',
    end: false,
  });
  const matches = !!match;

  const handleOpenEditModal = () => setEditModal(true);
  const handleCloseEditModal = () => setEditModal(false);

  const handleLogout = () => {
    localStorage.removeItem('fordexAuth');
    window.location.pathname = '/sign-in';
  };

  return (
    <Fragment>
      {action === ACTIONS.EDIT_PROFILE_ACTION && (
        <EditProfileForm open={editModal} onClose={handleCloseEditModal} />
      )}
      <ListItem
        component={NavLink}
        disablePadding
        to={
          action
            ? window.location.pathname
            : nestedLinks
              ? routePath?.fullPath ?? ''
              : ''
        }
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
            minWidth: 10,
            marginRight: 2,
          },
        }}
        onClick={
          action === ACTIONS.EDIT_PROFILE_ACTION
            ? handleOpenEditModal
            : action === ACTIONS.LOG_OUT_ACTION
              ? handleLogout
              : undefined
        }
      >
        <ListItemButton selected={matches}>
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <ListItemText primary={label} />
          {nestedLinks && (
            <Fragment>{matches ? <ExpandLess /> : <ExpandMore />}</Fragment>
          )}
        </ListItemButton>
      </ListItem>
      {nestedLinks && (
        <Collapse in={matches} timeout="auto" unmountOnExit>
          <List component="div" disablePadding dense>
            {nestedLinks.map((item, i) => (
              <NestedNavLink
                label={item.label}
                routePath={item.routePath}
                key={i}
              />
            ))}
          </List>
        </Collapse>
      )}
    </Fragment>
  );
}
