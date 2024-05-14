import { Fab, Tooltip } from '@mui/material';
import { ReactNode, useContext, useLayoutEffect } from 'react';
import { FABVisibilityContext } from '../utils/fab-visibility-context';
import { styled } from '@mui/system';

interface DataTableFabActionProps {
  title: string;
  icon: ReactNode;
  onClick: () => void;
}

export function DataTableFabAction({
  icon,
  title,
  onClick,
}: DataTableFabActionProps) {
  const { toggle } = useContext(FABVisibilityContext);

  useLayoutEffect(() => toggle(true));

  return (
    <StyledTooltip title={title} placement="top">
      <Fab
        onClick={onClick}
        color="primary"
        size="medium"
        sx={(theme) => ({
          display: { md: 'none' },
          marginLeft: 'auto',
          position: 'absolute',
          bottom: `calc(52px + ${theme.spacing(1)})`,
          right: 8,
        })}
      >
        <span>{title}</span>
        {icon}
      </Fab>
    </StyledTooltip>
  );
}

const StyledTooltip = styled(Tooltip)`
  span {
    display: none;
  }
  @media (max-width: 800px) {
    border-radius: 10px !important;
    width: max-content;
    padding: 10px;
    span {
      display: inline-block;
      margin-right: 5px;
    }
  }
`;
