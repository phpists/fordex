import { TextField, TextFieldProps } from '@mui/material';
import { useAddressesContext } from '../lib/addresses-context';
import { forwardRef } from 'react';

type StreetTextField = TextFieldProps;

export const StreetTextField = forwardRef<HTMLInputElement, StreetTextField>(
  function StreetTextFieldBase(props, ref) {
    useAddressesContext();
    return <TextField {...props} label="Strasse" ref={ref} />;
  }
);
