import { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Modal, useMediaQuery, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { useAppHeaderContent, usePageName } from 'widgets/layouts/app-layout';
import { CreateTransportationOrderForm } from 'widgets/create-order-request-form';
import { RequestOrdersTable } from 'widgets/orders-table';
import { ROUTE_PATHS } from 'shared/config';

export function RequestOrdersPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [searchParams] = useSearchParams();
  const shouldOpenCreateModal = searchParams.get('new') === 'true';

  const goToCreateOrderForm = useCallback(() => {
    navigate(ROUTE_PATHS.TRANSPORTATION_ORDERS.NEW_ORDER.fullPath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const backToOrdersTable = useCallback(() => {
    navigate(ROUTE_PATHS.TRANSPORTATION_ORDERS.IN_REVIEW.fullPath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  usePageName('Meine Anfragen');
  useAppHeaderContent(
    () => [
      {
        type: 'button',
        label: 'Neuer Transport-Auftrag',
        variant: 'contained',
        startIcon: AddIcon,
        shouldRender: !isTablet,
        onClick: goToCreateOrderForm,
      },
    ],
    [goToCreateOrderForm, isTablet]
  );

  return (
    <>
      <RequestOrdersTable />
      <Modal open={shouldOpenCreateModal} onClose={backToOrdersTable}>
        <CreateTransportationOrderForm
          onCancelClick={backToOrdersTable}
          onSuccess={backToOrdersTable}
          sx={(theme) => ({
            margin: 'auto',
            width: '100%',
            maxHeight: 700,
            maxWidth: 1000,
            top: '50%',
            transform: 'translateY(-50%)',
            [theme.breakpoints.down('md')]: {
              borderRadius: 0,
              flexGrow: 1,
              height: '100%',
              maxHeight: 'unset',
              top: 'unset',
              transform: 'unset',
            },
          })}
        />
      </Modal>
    </>
  );
}
