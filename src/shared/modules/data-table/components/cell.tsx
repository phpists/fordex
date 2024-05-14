import { TableCell, TableCellProps, styled } from '@mui/material';

interface Props extends TableCellProps {
  isMobile?: boolean;
  mobileRowsList?: string[];
  columnNumber?: number;
}

export const StyledCell = styled(TableCell)<Props>`
  white-space: nowrap;
  background: none;
  &:not(:last-of-type):not(:first-of-type) {
    padding: ${({ theme }) => `${theme.spacing(0.5)} ${theme.spacing(0.25)}`};
  }
  &:first-of-type {
    padding-right: ${({ theme }) => `${theme.spacing(0.25)}`};
  }
  &:last-of-type {
    padding-left: ${({ theme }) => `${theme.spacing(0.25)}`};
  }
  .arrowDown {
    display: none;
  }
  .column-more-list {
    display: none;
  }
  @media (max-width: 1400px) {
    ${({ isMobile }) => !isMobile && 'display: none !important;'};
    .arrowDown {
      display: inline-block;
      margin: 0 10px 0 5px;
      width: 13px;
      transition: all 0.3s;
      &.active {
        transform: rotate(180deg);
      }
    }
    .last-mobile-cell {
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        font-size: 8px;
        padding: 0 5px;
      }
    }
    .column-more-list {
      margin-top: 5px;
      display: block;
    }
    &.head-cell.mobile {
      &:nth-child(4) {
        width: 500px;
      }
      &:nth-child(6) {
        width: 80px;
      }
    }
  }
  &.first-cell {
    width: 113px;
  }
  @media (max-width: 1200px) {
    &.head-cell.mobile {
      &:nth-child(4) {
        width: 300px;
      }
    }
    &.active {
      border-bottom: none !important;
    }
  }
  @media (max-width: 600px) {
    &.head-cell.mobile {
      &:nth-child(4) {
        width: 120px;
      }
      &:nth-child(6) {
        width: 90px;
      }
    }
  }
  @media (max-width: 500px) {
    font-size: 12px;
    span {
      font-size: 12px;
    }
  }
`;

export const StyledCellMore = styled(TableCell)<Props>`
  vertical-align: baseline;
  div {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: max-content;
    gap: 5px;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 1.43;
    letter-spacing: 0.01071em;
    .cell-more-item {
    }
  }
  .cell-more-label {
    font-weight: 700;
  }
  .cell-more-row {
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    gap: 5px;
  }
  &.no-padding {
    padding-left: 0;
    padding-right: 5px;
  }
  .boxAmount,
  .bold {
    font-weight: bold;
  }
  &.first-cell {
    width: 113px;
  }
  @media (max-width: 600px) {
    &.content {
      width: 100px;
    }
  }
  @media (min-width: 1400px) {
    display: none;
  }
  @media (max-width: 500px) {
    div {
      font-size: 12px;
    }
    span {
      font-size: 12px;
    }
    button {
      padding: 4px;
    }
  }
`;
