import { Accessor, ColumnDef } from '../types/common';

export const createColumnBuilder = <T>() => ({
  create: <U, K extends Accessor<T, U>>(
    accessor: K,
    columnDef: Omit<ColumnDef<T, U, K>, 'accessor'>
  ): ColumnDef<T, U, K> => ({ accessor, ...columnDef }),
});
