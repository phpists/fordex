import {
  Autocomplete,
  Box,
  List,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { useShallow } from 'zustand/react/shallow';
import { useVirtualizer } from '@tanstack/react-virtual';
import { mergeRefs } from 'react-merge-refs';

import { selectCities, useAddressesStore } from '../model/use-addresses-store';
import { CityModel, CountryModel } from '../model/types';
import React, {
  FocusEvent,
  HTMLAttributes,
  forwardRef,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { useAddressesContext } from '../lib/addresses-context';

interface CityAutocompleteProps {
  // optionValue: CityModel | null;
  textValue: string;
  selectedCountry: CountryModel | null;
  name: string;
  invalid: boolean;
  disabled?: boolean;
  variant?: TextFieldProps['variant'];
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  // onOptionChange: (city: CityModel | null) => void;
  onTextChange: (value: string) => void;
}

const CitiesListBox = forwardRef<HTMLDivElement, HTMLAttributes<HTMLElement>>(
  function CitiesListBase({ children, ...otherProps }, ref) {
    const parentRef = useRef<HTMLDivElement>(null);
    const childrenArray = useMemo(
      () => React.Children.toArray(children),
      [children]
    );

    const rowVirtualizer = useVirtualizer({
      overscan: 5,
      count: childrenArray.length,
      estimateSize: () => 48,
      getScrollElement: () => parentRef.current,
    });

    const virtualItems = rowVirtualizer.getVirtualItems();

    return (
      <div
        ref={mergeRefs([ref, parentRef])}
        style={{
          height: 400,
          overflow: 'auto',
        }}
      >
        <Box
          height={rowVirtualizer.getTotalSize()}
          width="100%"
          position="relative"
        >
          <List
            {...otherProps}
            style={{
              position: 'absolute',
              maxHeight: 'unset',
              overflow: 'hidden',
              width: '100%',
              top: 0,
              left: 0,
              transform: `translateY(${virtualItems[0]?.start ?? 0}px)`,
            }}
          >
            {virtualItems.map((virtualItem) => (
              <Box key={virtualItem.key} ref={rowVirtualizer.measureElement}>
                {childrenArray[virtualItem.index]}
              </Box>
            ))}
          </List>
        </Box>
      </div>
    );
  }
);

export const CityAutocomplete = forwardRef<
  HTMLInputElement,
  CityAutocompleteProps
>(function CityAutocompleteBase(
  {
    variant,
    textValue,
    // muiAutocompleteProps = {},
    name,
    invalid,
    disabled,
    // optionValue,
    selectedCountry,
    onBlur,
    // onOptionChange,
    onTextChange,
  },
  ref
) {
  useAddressesContext();
  const { citiesLoading, cities } = useAddressesStore(useShallow(selectCities));
  const citiesByCountry = useMemo(() => {
    if (selectedCountry) {
      return cities[selectedCountry.value] ?? [];
    }
    return [];
  }, [cities, selectedCountry]);

  const handleCityChange = useCallback(
    (_: unknown, value: string | CityModel) =>
      onTextChange(typeof value === 'string' ? value : value.label),
    [onTextChange]
  );

  if (selectedCountry?.label !== 'CH') {
    return (
      <TextField
        disabled={disabled}
        onBlur={onBlur}
        onChange={(e) => onTextChange(e.currentTarget.value)}
        value={textValue}
        label="PLZ, Ort"
        variant={variant}
        fullWidth
        inputProps={{
          autoComplete: 'none',
        }}
        inputRef={ref}
        error={invalid}
        name={name}
      />
    );
  }

  return (
    <Autocomplete
      freeSolo
      disableClearable
      options={citiesByCountry}
      value={textValue}
      loading={citiesLoading}
      disabled={disabled}
      onBlur={onBlur}
      onChange={handleCityChange}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      ListboxComponent={CitiesListBox}
      renderInput={(params) => (
        <TextField
          {...params}
          name={name}
          error={invalid}
          value={textValue}
          onChange={(e) => onTextChange(e.currentTarget.value)}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'none',
          }}
          variant={variant}
          label="PLZ, Ort"
          inputRef={ref}
        />
      )}
    />
  );
});
