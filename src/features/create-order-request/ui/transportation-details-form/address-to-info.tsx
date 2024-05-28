import { Box, Grid, Stack, TextField, styled } from '@mui/material';
import { DatePicker, TimeField } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { Controller, useWatch } from 'react-hook-form';
import { useEffect, useMemo, useRef } from 'react';

import {
  AddressesInputProvider,
  CityAutocomplete,
  CountrySelect,
  PostAddressModel,
  PostAddressesAutocomplete,
  StreetTextField,
} from 'entities/address';

import { colorByLocationType } from '../../lib/colors';
import { LocationType } from '../../lib/location-type';
import { useTransportationDetailsFormContext } from '../../model/use-transportation-details-form';

const AddressFormWrapper = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(2),
  background: colorByLocationType[LocationType.To],
  borderRadius: theme.shape.borderRadius,
}));

export function AddressToInfo() {
  const NEXT_DAY = dayjs().add(1, 'day');
  const IS_NEXT_DAY = new Date()?.getHours() > 15;
  const MIN_CURRENT_DATE = useRef(IS_NEXT_DAY ? NEXT_DAY : dayjs()).current;
  const { control, setValue, getFieldState, formState, register } =
    useTransportationDetailsFormContext();
  const watchCountryTo = useWatch({
    control,
    name: 'addressTo.country',
  });

  const { invalid: userNameInvalid } = getFieldState(
    'addressTo.userName',
    formState
  );
  const { invalid: streetInvalid } = getFieldState('addressTo.street');
  const { invalid: phoneNumberInvalid } = getFieldState(
    'addressTo.phoneNumber'
  );

  const addressFromDateISO = useWatch({ control, name: 'addressFrom.date' });
  const addressToDateISO = useWatch({ control, name: 'addressTo.date' });
  const addressFromDateParsed = useMemo(
    () => (addressFromDateISO ? dayjs(addressFromDateISO) : undefined),
    [addressFromDateISO]
  );

  useEffect(() => {
    if (addressToDateISO?.length === 0) {
      if (IS_NEXT_DAY) {
        setValue('addressTo.date', NEXT_DAY?.toISOString());
      } else {
        setValue('addressTo.date', MIN_CURRENT_DATE?.toISOString());
      }
    }
  }, []);

  useEffect(() => {
    if (
      dayjs(addressFromDateISO)?.unix() > dayjs(addressToDateISO)?.unix() ||
      addressToDateISO?.length === 0
    ) {
      console.log('here');
      setValue('addressTo.date', addressFromDateISO);
    }
  }, [addressFromDateISO]);

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
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={userNameInvalid}
                variant="standard"
                label="Empfänger Name"
                {...register('addressTo.userName')}
              />
            </Grid>
            <Grid item xs={3}>
              <Controller
                control={control}
                name="addressTo.country"
                render={({ field, fieldState: { invalid } }) => (
                  <CountrySelect
                    formControlProps={{
                      fullWidth: true,
                      variant: 'standard',
                      error: invalid,
                    }}
                    value={field.value}
                    onChange={(e) => {
                      setValue('addressTo.city', '');
                      field.onChange(e);
                    }}
                    onBlur={field.onBlur}
                    ref={field.ref}
                  />
                )}
              />
            </Grid>
            <Grid item xs={9}>
              <Controller
                control={control}
                name="addressTo.city"
                render={({ field, fieldState: { invalid } }) => {
                  if (watchCountryTo?.label === 'CH') {
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
                      selectedCountry={watchCountryTo}
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
            <Grid item xs={12}>
              <StreetTextField
                fullWidth
                error={streetInvalid}
                variant="standard"
                {...register('addressTo.street')}
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={1}
            width={{ xs: '100%', md: '30%' }}
            minWidth={{ xs: undefined, md: 125 }}
          >
            <Grid item xs={12}>
              <Controller
                control={control}
                name="addressTo.date"
                render={({ field, fieldState: { invalid } }) => (
                  <DatePicker
                    timezone="UTC"
                    label="Abladedatum"
                    value={field.value ? dayjs(field.value) : null}
                    minDate={addressFromDateParsed ?? MIN_CURRENT_DATE}
                    defaultValue={dayjs().set('hours', 0).set('minutes', 0)}
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
            <Grid item xs={6}>
              <Controller
                control={control}
                name="addressTo.timeFrom"
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
            <Grid item xs={6}>
              <Controller
                control={control}
                name="addressTo.timeTo"
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
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="standard"
                label="Telefonnummer"
                type="phone"
                error={phoneNumberInvalid}
                {...register('addressTo.phoneNumber')}
              />
            </Grid>
          </Grid>
        </Box>
      </AddressFormWrapper>
    </AddressesInputProvider>
  );
}
