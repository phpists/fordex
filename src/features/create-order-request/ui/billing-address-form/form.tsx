import { useController } from 'react-hook-form';
import { Box, Checkbox, FormControlLabel, Stack } from '@mui/material';
import { ChangeEvent, useCallback } from 'react';

import { ExistingAddressesList } from './existing-addresses-list';
import { NewBillingAddressForm } from './new-billing-address-form';
import {
  DEFAULT_MANUAL_ADDRESS,
  DEFAULT_SELECTED_ADDRESS,
  useBillingAddressFormContext,
} from '../../model/use-billing-address-form';

export function AddBillingAddressForm() {
  const { control, resetField } = useBillingAddressFormContext();
  const { field: manualAddressCheckField } = useController({
    control,
    name: 'manualAddressChecked',
  });

  const handleAddressTypeChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const manualAddressChecked = e.currentTarget.checked;

      manualAddressCheckField.onChange(manualAddressChecked);

      if (manualAddressChecked) {
        resetField('address.selectedAddress', {
          defaultValue: DEFAULT_SELECTED_ADDRESS,
        });
      } else {
        resetField('address.manualAddress', {
          defaultValue: DEFAULT_MANUAL_ADDRESS,
        });
      }
    },
    [manualAddressCheckField, resetField]
  );

  return (
    <Stack gap={2}>
      <Box pl={2}>
        <FormControlLabel
          control={
            <Checkbox
              checked={manualAddressCheckField.value}
              onChange={handleAddressTypeChange}
            />
          }
          label="Eigene Rechnungs Adresse"
        />
      </Box>
      {!manualAddressCheckField.value && <ExistingAddressesList />}
      {manualAddressCheckField.value && <NewBillingAddressForm />}
    </Stack>
  );
}
