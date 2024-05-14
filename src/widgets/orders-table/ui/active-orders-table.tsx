import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { paginatedActiveOrdersQuery } from 'entities/order/api/queries/get-active-orders-query';

import { DataTable } from 'shared/modules/data-table';
import { ROUTE_PATHS } from 'shared/config';

import {
  MOBILE_COLUMNS_ACTIVE_ORDERS,
  configureActiveOrdersTableColumns,
} from '../lib/configure-columns';

const { usePaginatedQuery: usePaginatedActiveOrdersQuery, store } =
  paginatedActiveOrdersQuery;

export function ActiveOrdersTable() {
  const navigate = useNavigate();
  const { data } = usePaginatedActiveOrdersQuery();
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
  }, [navigate]);

  const columns = useMemo(() => configureActiveOrdersTableColumns(), []);

  const fabAction = useMemo(
    () => ({
      title: 'Neuer Transport-Auftrag',
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
        mobileColumns={MOBILE_COLUMNS_ACTIVE_ORDERS}
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
}
