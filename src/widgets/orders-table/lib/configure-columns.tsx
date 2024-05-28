import { createColumnBuilder } from 'shared/modules/data-table';
import { Box } from '@mui/material';
import dayjs from 'dayjs';

import {
  OrderStatusChip,
  RequestOrderModel,
  isOrderConfirmed,
  isOrderRejected,
} from 'entities/order';

import { ActiveOrderModel } from '../model/types';
import { CancelRequestOrderRowAction } from '../ui/row-actions';
import { DownloadDocumentRowAction } from '../ui/row-actions/download-document';

const activeOrdersTableColumnBuilder = createColumnBuilder<ActiveOrderModel>();
const requestOrdersTableColumnBuilder =
  createColumnBuilder<RequestOrderModel>();

export const MOBILE_COLUMNS_ACTIVE_ORDERS = [
  'orderId',
  'zipCityReceipt',
  'weight',
  'orderStatus',
];

export const configureActiveOrdersTableColumns = () => [
  activeOrdersTableColumnBuilder.create('orderId', {
    id: 'orderId',
    renderHead: () => 'Anfrage Nr.',
    renderCell: (value) => <Box>{value}</Box>,
    isMobile: true,
  }),
  // activeOrdersTableColumnBuilder.create('dispensationDate', {
  //   id: 'dispensationDate',
  //   renderHead: () => 'Dispodatum',
  //   renderCell: (value) => <Box>{dayjs(value).format('DD.MM.YYYY')}</Box>,
  // }),
  //   activeOrdersTableColumnBuilder.create('truckId', {
  //     id: 'truckId',
  //     renderHead: () => 'Farz. Nr.',
  //     renderCell: (value) => <Box>{value}</Box>,
  //   }),
  activeOrdersTableColumnBuilder.create('zipCityDispatch', {
    id: 'zipCityDispatch',
    renderHead: () => 'Lade-ort',
    renderCell: (value) => (
      <Box
        sx={{
          p: 1 / 2,
          background: '#56CCF233',
          borderRadius: 1,
        }}
      >
        <Box>{value}</Box>
      </Box>
    ),
  }),
  activeOrdersTableColumnBuilder.create('dateTimeDispatch', {
    id: 'dateTimeDispatch',
    renderHead: () => 'Lade-datum',
    renderCell: (value) => (
      <Box
        sx={{
          p: 1 / 2,
          background: '#56CCF233',
          borderRadius: 1,
        }}
      >
        <Box>{value}</Box>
      </Box>
    ),
  }),
  activeOrdersTableColumnBuilder.create('zipCityReceipt', {
    id: 'zipCityReceipt',
    renderHead: () => 'Ablade-ort',
    isMobile: true,
    mobileRowsList: ['dateTimeReceipt'],
    renderCell: (value) => (
      <Box
        sx={{
          p: 1 / 2,
          background: '#6FCF9733',
          borderRadius: 1,
        }}
      >
        <Box>{value}</Box>
      </Box>
    ),
  }),
  activeOrdersTableColumnBuilder.create('dateTimeReceipt', {
    id: 'dateTimeReceipt',
    renderHead: () => 'Ablade-datum',
    renderCell: (value) => (
      <Box
        sx={{
          p: 1 / 2,
          background: '#6FCF9733',
          borderRadius: 1,
        }}
      >
        <Box>{value}</Box>
      </Box>
    ),
  }),
  activeOrdersTableColumnBuilder.create('weight', {
    id: 'weight',
    renderHead: () => 'Gewicht kg',
    renderCell: (value) => <Box fontWeight="bold">{value}</Box>,
    isMobile: true,
  }),
  activeOrdersTableColumnBuilder.create('countEup', {
    id: 'countEup',
    renderHead: () => 'Anz. Pal.',
    columnNumber: 3,
    renderCell: (value) => (
      <Box fontWeight="bold" className="bold">
        {value}
      </Box>
    ),
  }),
  activeOrdersTableColumnBuilder.create('orderStatus', {
    id: 'orderStatus',
    renderHead: () => 'Status',
    renderCell: (value) => (
      <OrderStatusChip status={value} type="active" size="small" />
    ),
    isMobile: true,
  }),
];

export const MOBILE_COLUMNS_ORDERS = ['orderId', 'to', 'weight', 'status'];

export const configureRequestOrdersTableColumns = () => [
  requestOrdersTableColumnBuilder.create('orderNumber', {
    id: 'orderId',
    renderHead: () => 'Anfrage Nr.',
    renderCell: (value) => <Box>{value}</Box>,
  }),
  requestOrdersTableColumnBuilder.create('deliveryInfo', {
    id: 'from',
    renderHead: () => 'Lade-ort',
    renderCell: (deliveryData) => (
      <Box p={1 / 2} bgcolor="#56CCF233" borderRadius={1}>
        <Box>{deliveryData.dispatchData.zipCity}</Box>
      </Box>
    ),
  }),
  requestOrdersTableColumnBuilder.create('deliveryInfo', {
    id: 'fromDate',
    renderHead: () => 'Lade-datum',
    renderCell: ({ dispatchData: { date, timeFrom, timeTo } }) => {
      const dispatchFullDate = dayjs(date).format('DD.MM.YYYY');
      const formattedDuration = `${timeFrom ?? ''}${timeFrom && timeTo ? '-' : ''}${timeTo ?? ''}`;
      return (
        <Box p={1 / 2} bgcolor="#56CCF233" borderRadius={1}>
          <Box>
            {dispatchFullDate}
            {formattedDuration.length > 0 && ' - '} {formattedDuration}
          </Box>
        </Box>
      );
    },
  }),
  requestOrdersTableColumnBuilder.create('deliveryInfo', {
    id: 'to',
    renderHead: () => 'Ablade-ort',
    mobileRowsList: ['toDate'],
    renderCell: ({ receiptData: { zipCity } }) => (
      <Box p={1 / 2} bgcolor="#6FCF9733" borderRadius={1}>
        <Box>{zipCity}</Box>
      </Box>
    ),
  }),
  requestOrdersTableColumnBuilder.create('deliveryInfo', {
    id: 'toDate',
    renderHead: () => 'Ablade-datum',
    renderCell: ({ receiptData: { date, timeFrom, timeTo } }) => {
      const dispatchFullDate = dayjs(date).format('DD.MM.YYYY');
      const formattedDuration = `${timeFrom ?? ''}${timeFrom && timeTo ? '-' : ''}${timeTo ?? ''}`;

      return (
        <Box p={1 / 2} bgcolor="#6FCF9733" borderRadius={1}>
          <Box>
            {dispatchFullDate} {formattedDuration.length > 0 && ' - '}{' '}
            {formattedDuration}
          </Box>
        </Box>
      );
    },
  }),
  requestOrdersTableColumnBuilder.create('effectiveWeight', {
    id: 'weight',
    renderHead: () => 'Gewicht kg',
    renderCell: (value) => <Box fontWeight="bold">{value}</Box>,
    isMobile: true,
  }),
  requestOrdersTableColumnBuilder.create('status', {
    id: 'status',
    renderHead: () => 'Status',
    renderCell: (value) => (
      <OrderStatusChip status={value} type="request" size="small" />
    ),
    isMobile: true,
  }),
  requestOrdersTableColumnBuilder.create(({ status, id }) => ({ status, id }), {
    id: 'rowActions',
    renderHead: () => 'Aktionen',
    renderCell: ({ status, id }) => (
      <Box display="flex" width="100%">
        {!(isOrderRejected(status) || isOrderConfirmed(status)) && (
          <CancelRequestOrderRowAction orderId={id} />
        )}
      </Box>
    ),
  }),
  activeOrdersTableColumnBuilder.create('id', {
    id: 'id',
    renderHead: () => '',
    renderCell: (id) => (
      <Box display="flex">
        <DownloadDocumentRowAction orderId={id} />
      </Box>
    ),
  }),
];
