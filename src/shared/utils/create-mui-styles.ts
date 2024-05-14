import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

type SxStyles = Record<string, SxProps<Theme>>;

export const createSxStyles = (styles: SxStyles) => styles;
