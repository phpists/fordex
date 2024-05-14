import { useMemo } from 'react';
import { Theme, SxProps } from '@mui/material';
import MUIPagination from '@mui/material/Pagination';
import { useStore } from 'zustand';

import { BasePaginationParams } from 'shared/api/pagination-dto';

import { createPaginatedDataStore } from '../store/store';
import { ITEMS_PER_PAGE } from '../utils/constants';

interface PaginationProps<T extends BasePaginationParams> {
  sx?: SxProps<Theme>;
  store: ReturnType<typeof createPaginatedDataStore<T>>;
}

export function Pagination<T extends BasePaginationParams>({
  sx,
  store,
}: PaginationProps<T>) {
  const paginationState = useStore(store, (store) => store.paginationState);
  const filterValues = useStore(store, (store) => store.filterValues);

  const pagesCount = useMemo(
    () => Math.ceil(paginationState.itemsCount / ITEMS_PER_PAGE) || 1,
    [paginationState.itemsCount]
  );

  return (
    <MUIPagination
      disabled={paginationState.itemsCount === 0}
      count={pagesCount}
      onChange={(_, page) => paginationState.setPage(page)}
      variant="outlined"
      page={filterValues.pageNumber}
      sx={sx}
    />
  );
}
