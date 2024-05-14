import {
  DefaultError,
  MutationOptions,
  keepPreviousData,
  queryOptions,
  useMutation,
} from '@tanstack/react-query';
import { BasePaginationParams, PaginatedData } from 'shared/api/pagination-dto';

export type PrimitiveKey = string | number;
export function createQueryKeyBuilder<T extends unknown[]>(
  staticKeys: PrimitiveKey[],
  includeDynamicKeys: true
): (dynamicKeys: T) => readonly [...PrimitiveKey[], ...T];
export function createQueryKeyBuilder<T extends unknown[]>(
  staticKeys: PrimitiveKey[],
  includeDynamicKeys?: false
): (_?: T) => readonly [...PrimitiveKey[]];
/**
 * Typed query key factory
 *
 * @param staticKeys Static keys, which won't be updated
 * @param includeDynamicKeys Should include dynamic keys, such as "id" of some item.
 * @returns {readonly [...PrimitiveKey[], T] | readonly [...PrimitiveKey[]]} builder of query keys
 */
export function createQueryKeyBuilder<T extends unknown[]>(
  staticKeys: PrimitiveKey[],
  includeDynamicKeys = false
) {
  if (includeDynamicKeys) {
    return (dynamicKeys: T) => [...staticKeys, ...dynamicKeys];
  } else {
    return () => [...staticKeys];
  }
}

/**
 * Create composed useMutation hook
 *
 * @param mutationFn Mutation function which will do mutation
 * @param creationScopeOptions additional mutation options on hook creation
 * @returns Composed & typed useMutation hook
 */
export function createMutationHook<
  TData = unknown,
  TVariables = void,
  TError = DefaultError,
>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  creationScopeOptions: Omit<
    MutationOptions<TData, TError, TVariables>,
    'mutationFn'
  > = {}
) {
  const useMutationHook = (
    hookScopeOptions: Omit<
      MutationOptions<TData, TError, TVariables>,
      'mutationFn'
    > = {}
  ) =>
    useMutation({ mutationFn, ...creationScopeOptions, ...hookScopeOptions });

  return useMutationHook;
}

export type PaginatedQueryFn<
  ParamsType extends BasePaginationParams,
  DataType,
> = (filters: ParamsType) => Promise<PaginatedData<DataType>>;
export function createPaginatedQueryBuilder<
  ParamsType extends BasePaginationParams,
  DataType,
  QueryFn extends PaginatedQueryFn<ParamsType, DataType>,
>(scope: string | string[], queryFn: QueryFn) {
  const staticQueryKey = [
    'paginated',
    ...[...(Array.isArray(scope) ? scope : [scope])],
  ];
  const queryKeyBuilder = createQueryKeyBuilder<[ParamsType]>(
    staticQueryKey,
    true
  );

  return {
    staticQueryKey,
    queryOptionsBuilder: (filters: ParamsType) =>
      queryOptions({
        retry: 0,
        queryKey: queryKeyBuilder([filters]),
        queryFn: () => queryFn(filters),
        placeholderData: keepPreviousData,
        initialData: {
          items: [] as DataType[],
          pageIndex: 1,
          totalPages: 0,
          totalCount: 0,
          hasPreviousPage: false,
          hasNextPage: false,
        },
      }),
    queryKeyBuilder,
  };
}
