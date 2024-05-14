import { TablePagination } from '@mui/material';

interface DataTablePaginationProps {
  page: number;
  pageSize: number;
  itemsCount: number;
  canGoNext: boolean;
  canGoPrev: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const paginationSx = {
  flexShrink: 1,
};

export function DataTablePagination({
  itemsCount,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: DataTablePaginationProps) {
  return (
    <TablePagination
      rowsPerPageOptions={[25, 50, 100]}
      component="div"
      count={itemsCount}
      rowsPerPage={pageSize}
      page={page}
      onPageChange={(_, newPage) => onPageChange(newPage + 1)}
      onRowsPerPageChange={(event) =>
        onPageSizeChange(parseInt(event.target.value, 10))
      }
      sx={paginationSx}
      labelRowsPerPage="Zeilen pro Seite"
    />
  );
}
