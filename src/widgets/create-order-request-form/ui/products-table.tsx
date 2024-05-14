import { useTheme, useMediaQuery } from '@mui/material';
import React, { useMemo } from 'react';

import { DataTable } from 'shared/modules/data-table';

import { useTransportationOrderStore } from '../model/use-transportation-order-store';
import { configureProductColumns } from '../lib/configure-product-columns';

import classes from './products-table.module.css';

export function ProductsTable() {
  const STRING_FIELDS = ['marking', 'description'];
  const products = useTransportationOrderStore(
    (store) => store.positionsForm.positions
  );

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const columns = useMemo(() => configureProductColumns(), []);

  if (isTablet) {
    return (
      <div className={classes.mobileList}>
        {products?.map((p, i) => (
          <React.Fragment key={i}>
            {columns?.map(({ renderHead, accessor, id }) => (
              <div key={id}>
                <b>{renderHead()}</b>
                <span>
                  {STRING_FIELDS?.includes(accessor)
                    ? p?.[accessor] ?? '-'
                    : isNaN(Number(p?.[accessor])) || !p?.[accessor]
                      ? '0'
                      : p?.[accessor]}
                </span>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    );
  }

  return (
    <DataTable>
      <DataTable.Renderer
        columns={columns}
        data={products}
        className={classes.table}
      />
    </DataTable>
  );
}
