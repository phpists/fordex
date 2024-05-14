import { Box, Divider, Stack, Typography } from '@mui/material';

import { Grid } from 'shared/components/Grid';

import { ShortLogisticsInfoGroup } from './short-logistics-info-group';
import { AddressFromInfo } from './address-from-info';
import { AddressToInfo } from './address-to-info';
import { TransportationDetails } from './transportation-details';
import { CustomerReferenceField } from './customer-reference-field';

export function AddTransportationForm() {
  return (
    <Stack gap={2}>
      <ShortLogisticsInfoGroup />
      <Grid container spacing={2}>
        <Grid xs={12} md={6}>
          <Stack>
            <Typography fontWeight="bold">
              Transport von (Lade-Adresse)
            </Typography>
            <AddressFromInfo />
          </Stack>
        </Grid>
        <Grid xs={12} md={6}>
          <Stack>
            <Typography fontWeight="bold">
              Transport nach (Ablade-Adresse)
            </Typography>
            <AddressToInfo />
          </Stack>
        </Grid>
      </Grid>
      <Box
        display="flex"
        gap={{ md: 2, xs: 1 }}
        flexDirection={{ md: 'row', xs: 'column-reverse' }}
      >
        <TransportationDetails />
        <Divider
          flexItem
          orientation="vertical"
          sx={(theme) => ({
            [theme.breakpoints.down('md')]: {
              display: 'none',
            },
          })}
        />
        <CustomerReferenceField
          sx={(theme) => ({
            [theme.breakpoints.up('md')]: {
              maxWidth: '50%',
            },
            [theme.breakpoints.down('md')]: {
              maxWidth: 'unset',
            },
          })}
        />
      </Box>
    </Stack>
  );
}
