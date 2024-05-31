import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useMediaQuery, useTheme } from '@mui/material';
import { useCallback } from 'react';

import { useAppHeaderContent, usePageName } from 'widgets/layouts/app-layout';
import { ActiveOrdersTable } from 'widgets/orders-table';
import { ROUTE_PATHS } from 'shared/config';

export function ActiveOrdersPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const handleCreateOrderClick = useCallback(() => {
    navigate(ROUTE_PATHS.TRANSPORTATION_ORDERS.NEW_ORDER.fullPath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  usePageName('Transportaufträge');
  useAppHeaderContent(
    () => [
      {
        type: 'button',
        label: 'Transportanfrage erstellen',
        variant: 'contained',
        startIcon: AddIcon,
        shouldRender: !isTablet,
        onClick: handleCreateOrderClick,
      },
    ],
    [handleCreateOrderClick, isTablet]
  );

  return <ActiveOrdersTable />;
}
