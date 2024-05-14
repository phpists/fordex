import { Accessor, AccessorFn, AccessorKey } from '../types/common';

const isAccessorKey = <T, U>(
  accessor: Accessor<T, U>
): accessor is AccessorKey<T> => {
  return typeof accessor === 'string';
};

export function applyAccessor<T, U, K extends Accessor<T, U>>(
  accessor: K,
  rowData: T
) {
  if (isAccessorKey(accessor)) {
    return rowData[accessor];
  }

  return (accessor as AccessorFn<T, U>)(rowData);
}
