import RouteIcon from '@mui/icons-material/Route';
import TuneIcon from '@mui/icons-material/Tune';
import LogoutIcon from '@mui/icons-material/Logout';

import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

import { ROUTE_PATHS } from 'shared/config';

export interface NavLink {
  label: string;
  routePath: {
    route: string;
    fullPath: string;
  } | null;
  icon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
  nestedLinks?: Omit<NavLink, 'nestedLinks' | 'icon'>[];
  action?: string;
}

export const ACTIONS = {
  EDIT_PROFILE_ACTION: 'openEditProfile',
  LOG_OUT_ACTION: 'logOut',
};

export const NAV_LINKS: NavLink[] = [
  {
    label: 'Auftragsverwaltung',
    routePath: ROUTE_PATHS.TRANSPORTATION_ORDERS.ROOT,
    icon: RouteIcon,
    nestedLinks: [
      {
        label: 'Transportaufträge',
        routePath: ROUTE_PATHS.TRANSPORTATION_ORDERS.ROOT,
      },
      {
        label: 'Meine Anfragen',
        routePath: ROUTE_PATHS.TRANSPORTATION_ORDERS.IN_REVIEW,
      },
    ],
  },
  {
    label: 'Profilübersicht',
    routePath: ROUTE_PATHS.SETTINGS.ROOT,
    icon: TuneIcon,
    action: ACTIONS.EDIT_PROFILE_ACTION,
  },
  {
    label: 'Ausloggen',
    routePath: ROUTE_PATHS.SETTINGS.ROOT,
    icon: LogoutIcon,
    action: ACTIONS.LOG_OUT_ACTION,
  },
];
