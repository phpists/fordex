import { useShallow } from 'zustand/react/shallow';
import { Button, IconButton, Tooltip } from '@mui/material';
import { Fragment, memo, useMemo } from 'react';

import { getSxPropsAsArray } from 'shared/utils/get-sx-props-as-array';

import { useAppLayoutStore } from '../model/use-app-layout-store';
import {
  ButtonHeaderContentNode,
  IconButtonHeaderContentNode,
} from '../model/header-content-node';

export const HeaderContentNodes = memo(function HeaderContentNodesBase() {
  const contentNodes = useAppLayoutStore(
    useShallow((store) => store.headerContentNodes)
  );

  const renderedContentNodes = useMemo(
    () =>
      contentNodes.map((node, i) => {
        if (node.shouldRender === false) {
          return <Fragment key={i} />;
        }

        switch (node.type) {
          case 'button':
            return <Fragment key={i}>{renderButtonNode(node)}</Fragment>;
          case 'icon-button':
            return <Fragment key={i}>{renderIconButtonNode(node)}</Fragment>;
        }
      }),
    [contentNodes]
  );

  return <>{renderedContentNodes}</>;
});

function renderButtonNode({
  label,
  onClick,
  color,
  sx,
  disabled,
  variant,
  startIcon: StartIcon,
  endIcon: EndIcon,
}: Omit<ButtonHeaderContentNode, 'shouldRender'>) {
  return (
    <Button
      startIcon={StartIcon ? <StartIcon /> : undefined}
      endIcon={EndIcon ? <EndIcon /> : undefined}
      variant={variant ?? 'contained'}
      color={color}
      disabled={disabled}
      sx={[
        {
          '&:disabled': {
            cursor: 'not-allowed',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'secondary.main',
            color: 'gray',
          },
        },
        ...getSxPropsAsArray(sx),
      ]}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}

function renderIconButtonNode({
  label,
  icon: Icon,
  onClick,
  color,
  sx,
  disabled,
}: Omit<IconButtonHeaderContentNode, 'shouldRender'>) {
  return (
    <Tooltip title={label} placement="bottom">
      <IconButton color={color} disabled={disabled} onClick={onClick} sx={sx}>
        <Icon />
      </IconButton>
    </Tooltip>
  );
}
