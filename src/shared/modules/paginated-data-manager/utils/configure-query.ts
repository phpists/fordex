import { useStore } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { useQuery } from '@tanstack/react-query';

import { BasePaginationParams, PaginatedData } from 'shared/api/pagination-dto';
import { PaginatedQueryFn, createPaginatedQueryBuilder } from 'shared/utils';

import { createPaginatedDataStore } from '../store/store';

interface InitialConfig<
  FilterType extends BasePaginationParams,
  DataType,
  QueryFn extends PaginatedQueryFn<FilterType, DataType>,
> {
  scopeName: string | string[];
  queryFn: QueryFn;
  initialFilterValues: Omit<FilterType, keyof BasePaginationParams>;
}

export function configurePaginatedDataQuery<
  FilterType extends BasePaginationParams = BasePaginationParams,
  DataType = unknown,
  QueryFn extends PaginatedQueryFn<FilterType, DataType> = (
    filters: FilterType
  ) => Promise<PaginatedData<DataType>>,
>({
  scopeName,
  queryFn,
  initialFilterValues,
}: InitialConfig<FilterType, DataType, QueryFn>) {
  const store = createPaginatedDataStore<FilterType>(initialFilterValues);
  const builders = createPaginatedQueryBuilder<FilterType, DataType, QueryFn>(
    scopeName,
    queryFn
  );

  const usePaginatedQuery = () => {
    const filterValues = useStore(
      store,
      useShallow((store) => store.filterValues)
    );
    return useQuery(builders.queryOptionsBuilder(filterValues));
  };

  return { store, usePaginatedQuery, builders, scopeName };
}
