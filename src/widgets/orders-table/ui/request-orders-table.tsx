import { useStore } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { memo, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

import { paginatedOrdersQuery } from 'entities/order';
import { ROUTE_PATHS } from 'shared/config';
import { DataTable } from 'shared/modules/data-table';

import {
  MOBILE_COLUMNS_ORDERS,
  configureRequestOrdersTableColumns,
} from '../lib/configure-columns';

const { usePaginatedQuery: usePaginatedOrdersQuery, store } =
  paginatedOrdersQuery;

export const RequestOrdersTable = memo(function RequestOrdersTableBase() {
  const navigate = useNavigate();
  const { data } = usePaginatedOrdersQuery();
  const pagination = useStore(
    store,
    useShallow(
      ({
        filterValues: { pageSize, pageNumber },
        paginationState: { setPage, setItemsCount, setPageSize },
      }) => ({
        pageNumber,
        pageSize,
        setPage,
        setItemsCount,
        setPageSize,
      })
    )
  );

  const onFabClick = useCallback(() => {
    navigate(ROUTE_PATHS.TRANSPORTATION_ORDERS.NEW_ORDER.fullPath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = useMemo(() => configureRequestOrdersTableColumns(), []);

  const fabAction = useMemo(
    () => ({
      title: 'Transportanfrage erstellen',
      icon: <AddIcon />,
      onClick: onFabClick,
    }),
    [onFabClick]
  );

  return (
    <DataTable>
      <DataTable.Fab {...fabAction} />
      <DataTable.Renderer
        columns={columns}
        data={data.items}
        rowKey="id"
        mobileColumns={MOBILE_COLUMNS_ORDERS}
      />
      <DataTable.Pagination
        canGoNext={data.hasNextPage}
        canGoPrev={data.hasPreviousPage}
        itemsCount={data.totalCount}
        pageSize={pagination.pageSize}
        page={pagination.pageNumber}
        onPageChange={pagination.setPage}
        onPageSizeChange={pagination.setPageSize}
      />
    </DataTable>
  );
});
