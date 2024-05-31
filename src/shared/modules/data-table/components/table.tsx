/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, memo, useContext, useMemo, useState } from 'react';
import arrowIcon from '../../../assets/images/arrow-down.svg';
import { styled } from '@mui/material/styles';
import {
  Table as MUITable,
  TableProps as MUITableProps,
  TableBody,
  TableContainer,
  TableRow,
} from '@mui/material';

import { applyAccessor } from '../utils/apply-accessor';
import { Head } from './head';
import { StyledCell, StyledCellMore } from './cell';
import { FABVisibilityContext } from '../utils/fab-visibility-context';

type RowKeys<T> = {
  [K in keyof T]: T[K] extends string | number ? K : never;
}[keyof T];

interface DataTableProps<T> {
  data: T[];
  columns: any[];
  rowKey?: RowKeys<T>;
  className?: string;
  mobileColumns?: string[];
}

const StyledTable = styled(MUITable)<MUITableProps>`
  table-layout: auto;
  width: 100%;
  tr.active {
    background: rgba(0, 0, 0, 0.04);
  }
`;

function DataTableBase<T>({
  data,
  rowKey,
  columns,
  className,
  mobileColumns,
}: DataTableProps<T>) {
  const { isShown } = useContext(FABVisibilityContext);
  const [openRow, setOpenRow] = useState<number | null>(null);
  const rowsWithCollumns: string[] = columns
    ?.filter((c) => c?.columnNumber)
    ?.map((c) => c.id);

  const { headerColumns, dataColumns } = useMemo(() => {
    const headerColumns = columns.map(({ renderHead, id }) => ({
      renderHead,
      id,
    }));
    const dataColumns = columns.map(({ accessor, renderCell, id }) => ({
      id,
      accessor,
      renderCell,
    }));

    return {
      headerColumns,
      dataColumns,
    };
  }, [columns]);

  const handleFilterMobileRows = () =>
    dataColumns
      ?.filter(({ id }) => !mobileColumns?.includes(id))
      ?.filter(({ id }) => !rowsWithCollumns?.includes(id))
      ?.filter(({ id }) => {
        const rowsWithMobileList = columns
          ?.filter((c) => c?.mobileRowsList)
          ?.map((c) => c.mobileRowsList);

        if (rowsWithMobileList?.length > 0) {
          return !rowsWithMobileList
            ?.reduce((a, b) => [
              ...(Array.isArray(a) ? a : []),
              ...(Array.isArray(b) ? b : []),
            ])
            ?.includes(id);
        } else {
          return true;
        }
      });

  return (
    <TableContainer
      className={className}
      sx={{
        flexGrow: 1,
        height: 0,
        overflow: 'auto',
        paddingBottom: isShown ? { xs: 8, md: 0 } : undefined,
      }}
    >
      <StyledTable aria-labelledby="tableTitle" size="small" stickyHeader>
        <Head columns={headerColumns} mobileColumns={mobileColumns} />
        <TableBody>
          {data.map((row, i) => {
            return (
              <Fragment key={i}>
                <TableRow
                  hover
                  key={`${rowKey ? row[rowKey] : i}`}
                  onClick={() => setOpenRow(openRow === i ? null : i)}
                  className={`${openRow === i && mobileColumns && 'active'}`}
                >
                  {dataColumns.map(({ accessor, id, renderCell }, index) => (
                    <StyledCell
                      key={index}
                      isMobile={!mobileColumns || mobileColumns?.includes(id)}
                      className={`${index === 0 && 'first-cell'} ${openRow === i && mobileColumns && 'active'}`}
                    >
                      <div
                        className={
                          mobileColumns?.[mobileColumns?.length - 1] ===
                          accessor
                            ? 'last-mobile-cell'
                            : ''
                        }
                      >
                        {renderCell(applyAccessor(accessor, row))}
                        {mobileColumns &&
                        mobileColumns?.[mobileColumns?.length - 1] ===
                          accessor ? (
                          <img
                            src={arrowIcon}
                            alt=""
                            className={`arrowDown ${openRow === i && 'active'}`}
                          />
                        ) : null}
                      </div>
                      {columns
                        ?.find((c) => c.id === id)
                        ?.mobileRowsList?.map((name: string, j: number) => (
                          <div className="column-more-list" key={j}>
                            {dataColumns
                              ?.find((d) => d.id === name)
                              ?.renderCell(
                                applyAccessor(
                                  dataColumns?.find((d) => d.id === name)
                                    ?.accessor,
                                  row
                                )
                              )}
                          </div>
                        ))}
                    </StyledCell>
                  ))}
                </TableRow>
                {openRow === i && mobileColumns ? (
                  <TableRow
                    hover
                    key={`${rowKey ? row[rowKey] : i}`}
                    className="active"
                  >
                    <StyledCellMore
                      key={i}
                      isMobile={true}
                      className={`${i === 0 && 'first-cell'}`}
                    >
                      <div>
                        {handleFilterMobileRows().map(({ id }, j) => (
                          <span className="cell-more-item" key={j}>
                            <span className="cell-more-label">
                              {headerColumns
                                ?.filter((c) => c?.id !== 'rowActions')
                                ?.find((c) => c.id === id)
                                ?.renderHead()}
                            </span>
                          </span>
                        ))}
                      </div>
                    </StyledCellMore>
                    <StyledCellMore
                      key={i}
                      isMobile={true}
                      className="no-padding content"
                    >
                      <div>
                        {handleFilterMobileRows().map(
                          ({ accessor, renderCell }, i) => (
                            <span className="cell-more-item" key={i}>
                              <span key={i}>
                                {renderCell(applyAccessor(accessor, row))}
                              </span>
                            </span>
                          )
                        )}
                      </div>
                    </StyledCellMore>
                    <StyledCellMore className="no-padding">
                      {dataColumns
                        ?.filter(({ id }) => !mobileColumns?.includes(id))
                        ?.filter(({ id }) => rowsWithCollumns?.includes(id))
                        .map(({ accessor, renderCell, id }, i) => (
                          <span className="cell-more-item" key={i}>
                            <span className="cell-more-label">
                              {headerColumns
                                ?.find((c) => c.id === id)
                                ?.renderHead()}
                            </span>
                            <span>
                              {renderCell(applyAccessor(accessor, row))}
                            </span>
                          </span>
                        ))}
                    </StyledCellMore>
                    {Array.from(Array(mobileColumns?.length - 3).keys())?.map(
                      (j) => <StyledCellMore key={j} />
                    )}
                  </TableRow>
                ) : null}
              </Fragment>
            );
          })}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
}

export const DataTableRenderer = memo(DataTableBase) as <T>(
  props: DataTableProps<T>
) => JSX.Element;
