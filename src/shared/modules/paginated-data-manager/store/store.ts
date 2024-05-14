import { immer } from 'zustand/middleware/immer';

import { BasePaginationParams } from 'shared/api/pagination-dto';
import { ResettableStoreManager } from 'shared/utils';

import { ITEMS_PER_PAGE } from '../utils/constants';

interface PaginationState {
  itemsCount: number;
  canGoNext: boolean;
  canGoPrev: boolean;
  setItemsCount: (itemsCount: number) => void;
  setCanChangePages: (canGoNext: boolean, canGoPrev: boolean) => void;
  setPageSize: (size: number) => void;
  goNext: () => void;
  goPrev: () => void;
  setPage: (page: number) => void;
}

interface PaginatedDataStore<T> {
  filterValues: T;
  paginationState: PaginationState;
  setFilters: (filters: T) => void;
  resetState: () => void;
}

const INITIAL_BASE_FILTER_VALUES: BasePaginationParams = {
  pageNumber: 0,
  pageSize: ITEMS_PER_PAGE,
};

export const createPaginatedDataStore = <
  T extends BasePaginationParams = BasePaginationParams,
>(
  initialFilterValues: Omit<T, keyof BasePaginationParams>
) => {
  const INITIAL_FILTERS_STATE = {
    ...INITIAL_BASE_FILTER_VALUES,
    ...initialFilterValues,
  } as T;

  return ResettableStoreManager.createResettableStore<PaginatedDataStore<T>>(
    'vanilla'
  )(
    immer((set, get) => ({
      filterValues: INITIAL_FILTERS_STATE,
      paginationState: {
        itemsCount: 0 as number,
        canGoNext: false as boolean,
        canGoPrev: false as boolean,
        setCanChangePages: (canGoNext, canGoPrev) =>
          set((state) => {
            state.paginationState.canGoNext = canGoNext;
            state.paginationState.canGoPrev = canGoPrev;
          }),
        goNext: () =>
          set((state) => {
            const canGoNext = get().paginationState.canGoNext;
            if (canGoNext) {
              state.filterValues.pageNumber++;
            }
          }),
        goPrev: () =>
          set((state) => {
            const canGoPrev = get().paginationState.canGoPrev;
            if (canGoPrev) {
              state.filterValues.pageNumber--;
            }
          }),
        setPageSize: (size) =>
          set((state) => {
            state.filterValues.pageSize = size;
          }),
        setItemsCount: (itemsCount) =>
          set((state) => {
            state.paginationState.itemsCount = itemsCount;
          }),
        setPage: (page) =>
          set((state) => {
            state.filterValues.pageNumber = page;
          }),
      },
      setFilters: (filterValues) => {
        set({ filterValues });
      },
      resetState: () =>
        set((state) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          state.filterValues = INITIAL_FILTERS_STATE;

          state.paginationState.canGoNext = false;
          state.paginationState.canGoPrev = false;
          state.paginationState.itemsCount = 0;
        }),
    })),
    (store) => store.getState().resetState
  );
};
