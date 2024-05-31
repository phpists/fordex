/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { forwardRef, useEffect, useState } from 'react';

import {
  Autocomplete,
  FormControl,
  FormControlProps,
  InputLabel,
  TextField,
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
  const {
    form: { register, control, setValue },
  } = useAddPositionsFormContext();
  const value = useWatch({
    control,
    name: `positions.${index}.pack`,
  });

  useEffect(() => {
    getPackadges().then((resp: any) => setPackadges(resp?.data?.data));
  }, []);

  return (
    <div>
      <InputLabel id="packadges-label">Verp</InputLabel>
      <FormControl {...formControlProps}>
        {/* @ts-ignore */}
        <Autocomplete
          {...register(`positions.${index}.pack`)}
          ref={ref}
          options={packadges?.map((p) => ({
            label: `${p.designation} ${p.kg}kg`,
            id: p?.id,
          }))}
          freeSolo
          value={value}
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                inputProps: {
                  ...params.inputProps,
                  maxLength: 10,
                },
              }}
              variant="standard"
              value={value}
              onChange={(e) =>
                setValue(`positions.${index}.pack`, e?.target.value)
              }
            />
          )}
        />
      </FormControl>
    </div>
  );
});
