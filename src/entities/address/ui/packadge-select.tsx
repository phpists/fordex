/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { forwardRef, useEffect, useState } from 'react';

import {
  Box,
  CircularProgress,
  FormControl,
  FormControlProps,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { getPackadges } from 'shared/api/address-api';
import { useAddPositionsFormContext } from 'features/create-order-request';
import { useWatch } from 'react-hook-form';

interface PackadgeSelectProps {
  formControlProps?: Omit<FormControlProps, 'ref'>;
  index: number;
}

interface Packadge {
  id: number;
  designation: string;
  kg: number;
}

export const PackadgeSelect = forwardRef<
  HTMLSelectElement,
  PackadgeSelectProps
>(function PackadgeSelectBase(
  { formControlProps = {}, index }: PackadgeSelectProps,
  ref
) {
  const [packadges, setPackadges] = useState<Packadge[]>([]);
  const [loading, setLoading] = useState(false);
  const {
    form: { register, control, setValue },
  } = useAddPositionsFormContext();
  const value = useWatch({
    control,
    name: `positions.${index}.pack`,
  });

  useEffect(() => {
    setLoading(true);
    getPackadges().then((resp: any) => {
      setLoading(false);
      setPackadges(resp?.data?.data);
    });
  }, []);

  return (
    <FormControl {...formControlProps}>
      <InputLabel id="packadges-label">Verp</InputLabel>
      {/* @ts-ignore */}
      <Select
        {...register(`positions.${index}.pack`)}
        labelId="packadges-label"
        label="Verp"
        ref={ref}
        value={value}
        onChange={(e) => setValue(`positions.${index}.pack`, e?.target.value)}
      >
        {loading && (
          <Box>
            <CircularProgress size={24} />
          </Box>
        )}
        {!loading &&
          packadges.map((packadge) => (
            <MenuItem
              selected={packadge.kg?.toString() === value?.toString()}
              key={packadge.id}
              value={packadge.kg.toString()}
            >
              {packadge.designation} {packadge.kg}kg
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
});
