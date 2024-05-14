import { Button } from '@mui/material';

import { CancelOrderConfirmation } from 'features/cancel-order';

import classes from './cancel-request-order.module.css';

interface CancelRequestOrderRowActionProps {
  orderId: number;
}

export function CancelRequestOrderRowAction({
  orderId,
}: CancelRequestOrderRowActionProps) {
  return (
    <CancelOrderConfirmation orderId={orderId}>
      <Button
        className={classes.button}
        color="error"
        size="small"
        variant="contained"
      >
        Anfrage stornieren
      </Button>
    </CancelOrderConfirmation>
  );
}
