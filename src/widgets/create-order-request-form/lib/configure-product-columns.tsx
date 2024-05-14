import { Tooltip, Typography } from '@mui/material';
import { PositionsFormValues } from 'features/create-order-request';
import { createColumnBuilder } from 'shared/modules/data-table';

const columnBuilder =
  createColumnBuilder<PositionsFormValues['positions'][number]>();

export function configureProductColumns() {
  return [
    columnBuilder.create('marking', {
      id: 'name',
      renderHead: () => 'Markierung/Ware',
      renderCell: (value) => <Typography>{value}</Typography>,
    }),
    columnBuilder.create('boxesQty', {
      id: 'boxesQty',
      renderHead: () => (
        <Typography fontWeight="bold" textAlign="end">
          Anzahl
        </Typography>
      ),
      renderCell: (value) => (
        <Typography textAlign="end">{value || 0}</Typography>
      ),
    }),
    columnBuilder.create('pack', {
      id: 'packType',
      renderHead: () => 'Verpackung',
      renderCell: (value) => <Typography>{value}</Typography>,
    }),
    columnBuilder.create('description', {
      id: 'description',
      renderHead: () => 'Warenbezeichnung',
      renderCell: (value) => {
        if (!value) {
          return <></>;
        }

        if (value.length > 60) {
          return (
            <Tooltip title={value} placement="top">
              <Typography>{value.substring(0, 60)}...</Typography>
            </Tooltip>
          );
        }

        return <Typography>{value}</Typography>;
      },
    }),
    columnBuilder.create('volume', {
      id: 'packType',
      renderHead: () => (
        <Typography fontWeight="bold" textAlign="end">
          m3
        </Typography>
      ),
      renderCell: (value) => (
        <Typography textAlign="end">{value || 0}</Typography>
      ),
    }),
    columnBuilder.create('ldm', {
      id: 'packType',
      renderHead: () => (
        <Typography fontWeight="bold" textAlign="end">
          LDM
        </Typography>
      ),
      renderCell: (value) => (
        <Typography textAlign="end">{value || 0}</Typography>
      ),
    }),
    columnBuilder.create('weight', {
      id: 'packType',
      renderHead: () => (
        <Typography fontWeight="bold" textAlign="end">
          Gewicht (kg)
        </Typography>
      ),
      renderCell: (value) => (
        <Typography textAlign="end">{value || 0}</Typography>
      ),
    }),
  ];
}
