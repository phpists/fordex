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
import React, {
  FocusEvent,
  HTMLAttributes,
  forwardRef,
  useCallback,
  useMemo,
  useRef,
} from 'react';

import {
  selectPostAddresses,
  useAddressesStore,
} from '../model/use-addresses-store';
import { PostAddressModel } from '../model/types';

import { useAddressesContext } from '../lib/addresses-context';

interface PostAddressesAutocompleteProps {
  selectedPostAddress: PostAddressModel | null;
  name: string;
  invalid: boolean;
  disabled?: boolean;
  variant?: TextFieldProps['variant'];
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  onOptionChange: (postAddress: PostAddressModel | null) => void;
}

const PostAddressesBox = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLElement>
>(function PostAddressesListBase({ children, ...otherProps }, ref) {
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
});

export const PostAddressesAutocomplete = forwardRef<
  HTMLInputElement,
  PostAddressesAutocompleteProps
>(function PostAddressesAutocomplete(
  {
    variant,
    name,
    invalid,
    disabled,
    selectedPostAddress,
    onBlur,
    onOptionChange,
  },
  ref
) {
  useAddressesContext();
  const { postAddresses, postAddressesLoading } = useAddressesStore(
    useShallow(selectPostAddresses)
  );

  const handlePostAddressChange = useCallback(
    (_: unknown, value: PostAddressModel | null) => onOptionChange(value),
    [onOptionChange]
  );

  return (
    <Autocomplete
      multiple={false}
      options={postAddresses}
      loading={postAddressesLoading}
      disabled={disabled}
      onBlur={onBlur}
      onChange={handlePostAddressChange}
      value={selectedPostAddress}
      getOptionKey={(option) => option.id}
      getOptionLabel={(option) => option.zipPostName}
      isOptionEqualToValue={(option, selectedOption) =>
        option.id === selectedOption.id
      }
      ListboxComponent={PostAddressesBox}
      renderInput={(params) => (
        <TextField
          {...params}
          name={name}
          error={invalid}
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
