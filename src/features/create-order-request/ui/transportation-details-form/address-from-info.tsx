import { useEffect, useState } from 'react';
import { Box, Stack, TextField, styled } from '@mui/material';
import { DatePicker, TimeField } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { Controller, useWatch } from 'react-hook-form';

import {
  StreetTextField,
  AddressesInputProvider,
  CityAutocomplete,
  CountrySelect,
  PostAddressModel,
  PostAddressesAutocomplete,
} from 'entities/address';
import { Grid } from 'shared/components/Grid';

import { colorByLocationType } from '../../lib/colors';
import { LocationType } from '../../lib/location-type';
import { useTransportationDetailsFormContext } from '../../model/use-transportation-details-form';

const AddressFormWrapper = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(2),
  background: colorByLocationType[LocationType.From],
  borderRadius: theme.shape.borderRadius,
}));

export function AddressFromInfo() {
  const NEXT_DAY = dayjs().add(1, 'day');
  const IS_NEXT_DAY = new Date()?.getHours() > 15;
  const [minDate, setMinDate] = useState(IS_NEXT_DAY ? NEXT_DAY : dayjs());
  const { control, setValue, getFieldState, register } =
    useTransportationDetailsFormContext();
  const watchCountryFrom = useWatch({
    control,
    name: 'addressFrom.country',
  });

  const { invalid: userNameInvalid } = getFieldState('addressFrom.userName');
  const { invalid: streetInvalid } = getFieldState('addressFrom.street');
  const { invalid: phoneNumberInvalid } = getFieldState(
    'addressFrom.phoneNumber'
  );

  useEffect(() => {
    if (IS_NEXT_DAY) {
      setMinDate(NEXT_DAY);
    }
  }, []);

  return (
    <AddressesInputProvider>
      <AddressFormWrapper>
        <Box
          gap={1}
          display="flex"
          alignItems="flex-start"
          flexWrap="nowrap"
          flexDirection={{ xs: 'column', md: 'row' }}
        >
          <Grid container spacing={1} width={{ xs: '100%', md: '70%' }}>
            <Grid xs={12}>
              <TextField
                fullWidth
                error={userNameInvalid}
                variant="standard"
                label="Absender Name"
                {...register('addressFrom.userName')}
              />
            </Grid>
            <Grid xs={3}>
              <Controller
                control={control}
                name="addressFrom.country"
                render={({ field, fieldState: { invalid } }) => (
                  <CountrySelect
                    formControlProps={{
                      fullWidth: true,
                      variant: 'standard',
                      error: invalid,
                    }}
                    value={field.value}
                    onChange={(e) => {
                      setValue('addressFrom.city', '');
                      field.onChange(e);
                    }}
                    onBlur={field.onBlur}
                    ref={field.ref}
                  />
                )}
              />
            </Grid>
            <Grid xs={9}>
              <Controller
                control={control}
                name="addressFrom.city"
                render={({ field, fieldState: { invalid } }) => {
                  if (watchCountryFrom?.label === 'CH') {
                    return (
                      <PostAddressesAutocomplete
                        variant="standard"
                        selectedPostAddress={
                          (field.value as PostAddressModel) || null
                        }
                        ref={field.ref}
                        disabled={field.disabled}
                        invalid={invalid}
                        name={field.name}
                        onBlur={field.onBlur}
                        onOptionChange={field.onChange}
                      />
                    );
                  }

                  return (
                    <CityAutocomplete
                      variant="standard"
                      selectedCountry={watchCountryFrom}
                      textValue={field.value as string}
                      ref={field.ref}
                      disabled={field.disabled}
                      invalid={invalid}
                      name={field.name}
                      onBlur={field.onBlur}
                      onTextChange={field.onChange}
                    />
                  );
                }}
              />
            </Grid>
            <Grid xs={12}>
              <StreetTextField
                fullWidth
                error={streetInvalid}
                variant="standard"
                {...register('addressFrom.street')}
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={1}
            xs={12}
            sm={5}
            width={{ xs: '100%', md: '30%' }}
            minWidth={{ xs: undefined, md: 125 }}
          >
            <Grid xs={12}>
              <Controller
                control={control}
                name="addressFrom.date"
                render={({ field, fieldState: { invalid } }) => (
                  <DatePicker
                    timezone="UTC"
                    label="Ladedatum"
                    value={field?.value ? dayjs(field?.value) : null}
                    minDate={minDate}
                    onChange={(value: Dayjs | null) =>
                      field.onChange(value?.toISOString() ?? '')
                    }
                    slotProps={{
                      textField: {
                        error: invalid,
                        fullWidth: true,
                        variant: 'standard',
                        inputProps: {
                          readOnly: true,
                        },
                      },
                    }}
                  />
                )}
              />
            </Grid>
            <Grid xs={6}>
              <Controller
                control={control}
                name="addressFrom.timeFrom"
                render={({ field, fieldState: { invalid } }) => (
                  <TimeField
                    fullWidth
                    label="Zeit"
                    variant="standard"
                    format="HH:mm"
                    name={field.name}
                    onBlur={field.onBlur}
                    value={field.value ? dayjs(field.value) : null}
                    slotProps={{
                      textField: {
                        error: invalid,
                      },
                    }}
                    defaultValue={dayjs().set('hours', 0).set('minutes', 0)}
                    onChange={(value: Dayjs | null) =>
                      field.onChange(value?.toISOString() ?? '')
                    }
                  />
                )}
              />
            </Grid>
            <Grid xs={6}>
              <Controller
                control={control}
                name="addressFrom.timeTo"
                render={({ field, fieldState: { invalid } }) => (
                  <TimeField
                    fullWidth
                    label="Zeit Bis"
                    variant="standard"
                    format="HH:mm"
                    name={field.name}
                    onBlur={field.onBlur}
                    value={field.value ? dayjs(field.value) : null}
                    slotProps={{
                      textField: {
                        error: invalid,
                      },
                    }}
                    defaultValue={dayjs().set('hours', 0).set('minutes', 0)}
                    onChange={(value: Dayjs | null) =>
                      field.onChange(value?.toISOString() ?? '')
                    }
                  />
                )}
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                fullWidth
                variant="standard"
                label="Telefonnummer"
                type="phone"
                error={phoneNumberInvalid}
                {...register('addressFrom.phoneNumber')}
              />
            </Grid>
          </Grid>
        </Box>
      </AddressFormWrapper>
    </AddressesInputProvider>
  );
}
