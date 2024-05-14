import { TextField } from '@mui/material';
import { Controller, useWatch } from 'react-hook-form';

import { Grid } from 'shared/components/Grid';

import { useBillingAddressFormContext } from '../../model/use-billing-address-form';
import {
  AddressesInputProvider,
  CityAutocomplete,
  CountrySelect,
  StreetTextField,
} from 'entities/address';

export function NewBillingAddressForm() {
  const { register, getFieldState, control, formState } =
    useBillingAddressFormContext();

  const { invalid: addressInvalid } = getFieldState('address', formState);

  const watchCountry = useWatch({
    control,
    name: 'address.manualAddress.country',
  });

  return (
    <AddressesInputProvider>
      <Grid container spacing={2} maxWidth={420} margin="0 auto">
        <Grid xs={12}>
          <TextField
            fullWidth
            variant="standard"
            label="Name"
            error={addressInvalid}
            {...register('address.manualAddress.name')}
          />
        </Grid>
        <Grid xs={12} container>
          <Grid xs={4} md={2}>
            <Controller
              control={control}
              name="address.manualAddress.country"
              render={({ field, fieldState: { invalid } }) => (
                <CountrySelect
                  formControlProps={{
                    fullWidth: true,
                    variant: 'standard',
                    error: invalid || addressInvalid,
                  }}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  ref={field.ref}
                />
              )}
            />
          </Grid>
          <Grid xs={8} md={10}>
            <Controller
              control={control}
              name="address.manualAddress.city"
              render={({ field, fieldState: { invalid } }) => (
                <CityAutocomplete
                  variant="standard"
                  selectedCountry={watchCountry}
                  textValue={field.value}
                  ref={field.ref}
                  disabled={field.disabled}
                  invalid={invalid || addressInvalid}
                  name={field.name}
                  onBlur={field.onBlur}
                  onTextChange={field.onChange}
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid xs={12}>
          <StreetTextField
            fullWidth
            error={addressInvalid}
            variant="standard"
            {...register('address.manualAddress.street')}
          />
        </Grid>
      </Grid>
    </AddressesInputProvider>
  );
}
