import { useIsAuthorized } from 'entities/session';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { ROUTE_PATHS } from 'shared/config';

interface GuestRouteProps {
  children: ReactNode;
}

export function GuestRoute({ children }: GuestRouteProps) {
  const hasAuthCredentials = useIsAuthorized();

  if (hasAuthCredentials) {
    return <Navigate to={ROUTE_PATHS.TRANSPORTATION_ORDERS.ROOT.fullPath} />;
  }

  return <>{children}</>;
}
