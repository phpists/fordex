/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TableHead,
  TableHeadProps,
  TableRow,
  Typography,
  styled,
} from '@mui/material';
import { StyledCell } from './cell';
import { ReactNode } from 'react';

interface HeadProps {
  columns: {
    renderHead: () => ReactNode;
    id: string;
  }[];
  mobileColumns?: string[];
}

const StyledTableHead = styled(TableHead)<TableHeadProps>({
  '& .MuiTableCell-root': {
    background: '#F2F2F2',
  },
});

export function Head({ columns, mobileColumns }: HeadProps) {
  return (
    <StyledTableHead>
      <TableRow>
        {columns.map(({ renderHead, id }, i) => (
          <StyledCell
            key={i}
            isMobile={!mobileColumns || mobileColumns?.includes(id)}
            className={`head-cell ${!mobileColumns || (mobileColumns?.includes(id) && 'mobile')}`}
          >
            {typeof renderHead() === 'string' ? (
              <Typography component="span" fontWeight="bold">
                {renderHead()}
              </Typography>
            ) : (
              renderHead()
            )}
          </StyledCell>
        ))}
      </TableRow>
    </StyledTableHead>
  );
}
