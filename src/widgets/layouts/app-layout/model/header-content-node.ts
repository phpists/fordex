import { SxProps, Theme, ButtonProps, SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { MouseEvent } from 'react';

export interface HeaderContentNode {
  label: string;
  sx?: SxProps<Theme>;
  shouldRender?: boolean;
}

export interface ButtonHeaderContentNode extends HeaderContentNode {
  type: 'button';
  variant?: ButtonProps['variant'];
  color?: ButtonProps['color'];
  disabled?: boolean;
  startIcon?: OverridableComponent<SvgIconTypeMap> & { muiName: string };
  endIcon?: OverridableComponent<SvgIconTypeMap> & { muiName: string };
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export interface IconButtonHeaderContentNode extends HeaderContentNode {
  type: 'icon-button';
  color?: ButtonProps['color'];
  disabled?: boolean;
  icon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export type HeaderContentNodes = (
  | ButtonHeaderContentNode
  | IconButtonHeaderContentNode
)[];
