import { SxProps, TextField, Theme } from '@mui/material';
import { useTransportationDetailsFormContext } from 'features/create-order-request/model/use-transportation-details-form';

interface TransportationDetailsProps {
  sx?: SxProps<Theme>;
}

export function TransportationDetails({ sx }: TransportationDetailsProps) {
  const { register } = useTransportationDetailsFormContext();

  return (
    <TextField
      fullWidth
      multiline
      label="Besonderes, weitere Details"
      variant="standard"
      rows={5}
      sx={sx}
      {...register('details')}
    />
  );
}
