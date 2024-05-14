import { SxProps, Theme } from '@mui/material';
import { SystemStyleObject } from '@mui/system';

type ArrayOfSx = readonly (
  | SystemStyleObject<Theme>
  | ((theme: Theme) => SystemStyleObject<Theme>)
)[];

export function getSxPropsAsArray(sx: SxProps<Theme> | undefined) {
  if (sx === undefined) {
    return [];
  }

  return (Array.isArray(sx) ? sx : [sx]) as ArrayOfSx;
}
