import { FunctionComponent, PropsWithChildren } from 'react';
import { Stack, SxProps, Theme } from '@mui/material';

import { DataTableFabAction } from './fab-action';
import { DataTablePagination } from './pagination';
import { DataTableToolbar } from './toolbar';
import { DataTableRenderer } from './table';
import { FABVisibility } from './fab-visibility';

interface DataTableWrapperProps extends PropsWithChildren {
  sx?: SxProps<Theme>;
}

type DataTableWrapperType = FunctionComponent<DataTableWrapperProps> & {
  Fab: typeof DataTableFabAction;
  Pagination: typeof DataTablePagination;
  Toolbar: typeof DataTableToolbar;
  Renderer: typeof DataTableRenderer;
};

export const DataTableWrapper: DataTableWrapperType = ({ sx, children }) => {
  return (
    <Stack
      width="100%"
      mb={2}
      height="100%"
      position="relative"
      bgcolor="white"
      sx={sx}
    >
      <FABVisibility>{children}</FABVisibility>
    </Stack>
  );
};

DataTableWrapper.Fab = DataTableFabAction;
DataTableWrapper.Pagination = DataTablePagination;
DataTableWrapper.Renderer = DataTableRenderer;
DataTableWrapper.Toolbar = DataTableToolbar;
