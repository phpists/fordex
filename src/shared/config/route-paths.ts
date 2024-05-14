export const ROUTE_PATHS = {
  SIGN_IN: {
    route: 'sign-in',
    fullPath: '/sign-in',
  },
  TRANSPORTATION_ORDERS: {
    ROOT: {
      route: 'transportation-orders',
      fullPath: '/transportation-orders',
    },
    IN_REVIEW: {
      route: 'in-review',
      fullPath: '/transportation-orders/in-review',
    },
    NEW_ORDER: {
      route: 'new',
      fullPath: '/transportation-orders/in-review?new=true',
    },
  },
  SETTINGS: {
    ROOT: {
      route: 'settings',
      fullPath: '/settings',
    },
  },
};
