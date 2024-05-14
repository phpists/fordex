import { CircularProgress, Stack } from '@mui/material';
import { ReactNode, useEffect } from 'react';

import { CenteredHeaderLogoPageLayout } from 'widgets/layouts/centered-header-logo-page-layout';
import { useSessionStore } from 'entities/session';
import { useNavigate } from 'react-router-dom';

interface AuthProviderProps {
  children: ReactNode;
  onAuthExpiration?: (() => void) | null;
}

export function AuthProvider({
  children,
  onAuthExpiration = null,
}: AuthProviderProps) {
  const credentialsLoading = useSessionStore(
    (state) => state.credentialsLoading
  );
  const credentials = useSessionStore((state) => state.credentials);
  const initializeAuthState = useSessionStore((state) => state.initializeState);
  const navigate = useNavigate();

  useEffect(() => {
    return initializeAuthState(onAuthExpiration);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initializeAuthState]);

  if (credentialsLoading)
    return (
      <CenteredHeaderLogoPageLayout>
        <Stack height="100%" alignItems="center" justifyContent="center">
          <CircularProgress />
        </Stack>
      </CenteredHeaderLogoPageLayout>
    );

  if (!credentials && !credentialsLoading) {
    navigate('/sign-in');
    return <></>;
  }

  return <>{children}</>;
}
