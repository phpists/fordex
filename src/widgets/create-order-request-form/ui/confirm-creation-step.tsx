import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import { Controller } from 'react-hook-form';

import { useConfirmCreationForm } from '../model/use-confirm-creation-form';
import { ProductsTable } from './products-table';
import { useTransportationOrderStore } from '../model/use-transportation-order-store';
import { getDisplayAddressText } from '../lib/get-display-address-text';
import { ProfileInfoDTO } from 'shared/api';

const theme = createTheme({
  typography: {
    fontSize: 10,
  },
  components: {
    MuiGrid: {
      styleOverrides: {
        root: {
          lineHeight: 1,
        },
      },
    },
  },
});

const theme2 = createTheme({
  typography: {
    fontSize: 12,
    allVariants: {
      lineHeight: 1,
    },
  },
});

interface Props {
  profileInfo?: ProfileInfoDTO | null;
}

export function ConfirmCreationStep({ profileInfo }: Props) {
  const { addressFrom, addressTo, customerReference, details } =
    useTransportationOrderStore((store) => store.transportationDetailsForm);
  const products = useTransportationOrderStore(
    (store) => store.positionsForm.positions
  );
  const form = useConfirmCreationForm();

  const displayDangerousGoods = useMemo(() => {
    const dangerousProducts = products.filter((it) => !!it.dangerousGoods);
    if (dangerousProducts.length === 0) {
      return 'Keine';
    }
    return dangerousProducts
      .map((it, i) => `${i + 1}. ${it.dangerousGoods}`)
      .join(', ');
  }, [products]);

  return (
    <Stack gap={1} height="100%" overflow="auto">
      <ThemeProvider theme={theme}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Transportfirma</Typography>
            <Typography>Türegün Transport GmbH</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Auftraggeber</Typography>
            <Typography>
              {profileInfo?.title} <br />
              {profileInfo?.countryZipCity ?? '-'} <br />
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item container xs={12} md={6}>
            <Grid item xs={12}>
              <Typography variant="h6">
                {addressFrom.country.label}{' '}
                {getDisplayAddressText(addressFrom.city)}
              </Typography>
            </Grid>
            <Grid item container xs={12}>
              <Grid item container xs={12}>
                <Grid item xs="auto" width={'100px !important'}>
                  <Typography component="span" fontWeight="bold">
                    Ladedatum:
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography component="span">
                    {dayjs(addressFrom.date).format('DD.MM.YYYY')}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item container xs={12}>
                <Grid item xs="auto" width={'100px !important'}>
                  <Typography component="span" fontWeight="bold">
                    Zeit:
                  </Typography>
                </Grid>
                <Grid item xs component="span">
                  <Typography>
                    {addressFrom.timeFrom &&
                      dayjs(addressFrom.timeFrom).format('HH:mm')}{' '}
                    {addressFrom.timeFrom && addressFrom.timeTo && '-'}{' '}
                    {addressFrom.timeTo &&
                      dayjs(addressFrom.timeTo).format('HH:mm')}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item container xs={12}>
                <Grid item xs="auto" width={'100px !important'}>
                  <Typography component="span" fontWeight="bold">
                    Telefon:
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography component="span">
                    {addressFrom.phoneNumber}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={12} md={6}>
            <Grid item xs={12}>
              <Typography variant="h6">
                {addressTo.country.label}{' '}
                {getDisplayAddressText(addressTo.city)}
              </Typography>
            </Grid>
            <Grid item container xs={12}>
              <Grid item container xs={12}>
                <Grid item xs="auto" width={'100px !important'}>
                  <Typography component="span" fontWeight="bold">
                    Ladedatum:
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography component="span">
                    {dayjs(addressTo.date).format('DD.MM.YYYY')}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item container xs={12}>
                <Grid item xs="auto" width={'100px !important'}>
                  <Typography component="span" fontWeight="bold">
                    Zeit:
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography component="span">
                    {addressTo.timeFrom &&
                      dayjs(addressTo.timeFrom).format('HH:mm')}{' '}
                    {addressTo.timeFrom && addressTo.timeTo && '-'}{' '}
                    {addressTo.timeTo &&
                      dayjs(addressTo.timeTo).format('HH:mm')}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item container xs={12}>
                <Grid item xs="auto" width={'100px !important'}>
                  <Typography component="span" fontWeight="bold">
                    Telefon:
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography component="span">
                    {addressTo.phoneNumber}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
      <ThemeProvider theme={theme2}>
        <Typography variant="h6" margin="0 auto">
          Lieferung
        </Typography>
        <ProductsTable />
      </ThemeProvider>
      <ThemeProvider theme={theme}>
        <Box>
          <Typography variant="h6">Gefahrengut/ADR:</Typography>
          <Typography>{displayDangerousGoods}</Typography>
        </Box>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Bemerkung:</Typography>
            <Typography>{details?.length ? details : '-'}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Referenz:</Typography>
            <Typography>
              {customerReference?.length ? customerReference : '-'}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Ort/Datum:</Typography>
            <Typography>{dayjs().format('DD.MM.YYYY')}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Name des Auftraggebers:</Typography>
            <Typography>{profileInfo?.title}</Typography>
          </Grid>
        </Grid>
      </ThemeProvider>
      <Controller
        control={form.control}
        name="confirmed"
        render={({ field: { value, onChange, ...restFieldProps } }) => (
          <FormControlLabel
            {...restFieldProps}
            checked={value}
            onChange={(_, checked) => onChange(checked)}
            required
            control={<Checkbox />}
            label="Ich bin mit den Bedingungen der Datenverarbeitung einverstanden"
          />
        )}
      />
    </Stack>
  );
}
