import { useIsAuthorized } from 'entities/session';

import { ReactNode, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { ROUTE_PATHS } from 'shared/config';

interface ProtectedRouteProps {
  onProtect?: () => void;
  children: ReactNode;
}

export function ProtectedRoute({ children, onProtect }: ProtectedRouteProps) {
  const hasAuthCredentials = useIsAuthorized();

  useEffect(() => {
    if (!hasAuthCredentials) {
      onProtect?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onProtect]);

  if (!hasAuthCredentials) {
    return <Navigate to={ROUTE_PATHS.SIGN_IN.fullPath} replace />;
  }

  return <>{children}</>;
}
