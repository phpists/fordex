import { SxProps, TextField, Theme } from '@mui/material';
import { useTransportationDetailsFormContext } from '../../model/use-transportation-details-form';

interface CustomerReferenceFieldProps {
  sx?: SxProps<Theme>;
}

export function CustomerReferenceField({ sx }: CustomerReferenceFieldProps) {
  const { register } = useTransportationDetailsFormContext();

  return (
    <TextField
      sx={sx}
      fullWidth
      label="Kundenreferenz"
      variant="standard"
      {...register('customerReference')}
    />
  );
}
