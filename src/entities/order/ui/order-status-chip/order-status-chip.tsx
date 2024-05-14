import { Chip, ChipProps, SxProps, Theme } from '@mui/material';
import { css } from '@emotion/react';
import { useMemo } from 'react';

import { RequestOrderStatus } from '../../model/request-order-status';
import { getOrderStatusColor } from '../../lib/order-status-chip-color';
import { getOrderStatusText } from '../../lib/get-order-status-text';

import classes from './order-status-chip.module.css';

interface OrderStatusChip {
  sx?: SxProps<Theme>;
  size?: ChipProps['size'];
  type: 'request' | 'active';
  status: string | RequestOrderStatus;
}

/**
 * Component which display the status
 * of active Transportation order
 */
export function OrderStatusChip({ status, size, sx, type }: OrderStatusChip) {
  const cssVariables = useMemo(
    () => css`
      --status-color: ${getOrderStatusColor(type, status)};
    `,
    [status, type]
  );

  return (
    <Chip
      size={size}
      sx={sx}
      variant="outlined"
      css={cssVariables}
      label={getOrderStatusText(type, status)}
      classes={{
        root: classes.rootOutlined,
      }}
    />
  );
}
