import { ReactNode } from 'react';

export type AccessorFn<DataType, ReturnAccessorType = DataType> = (
  row: DataType
) => ReturnAccessorType;

export type AccessorKey<DataType> = keyof DataType;

export type Accessor<DataType, ReturnAccessorType = DataType> =
  | AccessorKey<DataType>
  | AccessorFn<DataType, ReturnAccessorType>;

export type AccessorValue<
  AccessorType,
  DataType,
  ReturnAccessorType = DataType,
> =
  AccessorType extends AccessorFn<DataType, ReturnAccessorType>
    ? ReturnType<AccessorType>
    : AccessorType extends AccessorKey<DataType>
      ? DataType[AccessorType]
      : never;

export interface ColumnDef<T, U, K extends Accessor<T, U>> {
  id: string;
  accessor: K;
  renderCell: (value: AccessorValue<K, T, U>) => ReactNode;
  renderHead: () => ReactNode;
  isMobile?: boolean;
  mobileRowsList?: string[];
  columnNumber?: number;
}
