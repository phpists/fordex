/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useShallow } from 'zustand/react/shallow';
import { FocusEvent, forwardRef, useCallback } from 'react';

import {
  selectCountries,
  useAddressesStore,
} from '../model/use-addresses-store';
import { CountryModel } from '../model/types';
import {
  Box,
  CircularProgress,
  FormControl,
  FormControlProps,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
} from '@mui/material';
import { useAddressesContext } from '../lib/addresses-context';

interface CountrySelectProps {
  formControlProps?: Omit<FormControlProps, 'ref'>;
  muiSelectProps?: Omit<SelectProps, 'ref' | 'onChange' | 'onBlur' | 'value'>;
  value: CountryModel | null;
  onChange: (country: CountryModel | null) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
}

export const CountrySelect = forwardRef<HTMLSelectElement, CountrySelectProps>(
  function CountrySelectBase(
    {
      formControlProps = {},
      muiSelectProps = {},
      value: selectedCountry,
      onChange,
      onBlur,
    }: CountrySelectProps,
    ref
  ) {
    useAddressesContext();

    const { countries, countriesLoading } = useAddressesStore(
      useShallow(selectCountries)
    );

    const handleChange = useCallback(
      (e: SelectChangeEvent<string>) => {
        onChange(countries.find((it) => it.value === e.target.value) || null);
      },
      [countries, onChange]
    );

    return (
      <FormControl {...formControlProps}>
        <InputLabel id="country-label">(CH)</InputLabel>
        {/* @ts-ignore */}
        <Select
          {...muiSelectProps}
          labelId="country-label"
          label="(CH)"
          ref={ref}
          value={selectedCountry?.value ?? ''}
          onChange={handleChange}
          onBlur={onBlur}
          renderValue={() =>
            selectedCountry ? <>{selectedCountry.label}</> : null
          }
        >
          {countriesLoading && (
            <Box>
              <CircularProgress size={24} />
            </Box>
          )}
          {!countriesLoading &&
            countries.map((country) => (
              <MenuItem
                selected={country.value === selectedCountry?.value}
                key={country.value}
                value={country.value}
              >
                {country.label}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    );
  }
);
