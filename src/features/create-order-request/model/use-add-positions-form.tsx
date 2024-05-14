import { z } from 'zod';
import { useCallback } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

const positionValidationSchema = z.object({
  marking: z.string().trim().min(1, 'Required'),
  pack: z.string().trim().min(1, 'Required'),
  boxesQty: z.number().min(0, 'Required').max(99999, 'Maximal 99999.00'),
  weight: z.number().min(1, 'Required').max(99999, 'Maximal 40000.99'),
  description: z
    .string()
    .regex(/^([^\n]*\n){0,5}[^\n]*$/)
    .trim()
    .optional(),
  dangerousGoods: z.string().trim().optional(),
  volume: z
    .number()
    .min(0)
    .max(99999.99, 'Maximal 9999.99')
    .optional()
    .nullable()
    .or(z.nan()),
  area: z
    .number()
    .min(0)
    .max(99.99, 'Maximal 99.99')
    .optional()
    .nullable()
    .or(z.nan()),
  ldm: z
    .number()
    .min(0)
    .max(999.99, 'Maximal 999.99')
    .optional()
    .nullable()
    .or(z.nan()),
});

export const positionsFormValidationSchema = z.object({
  positions: positionValidationSchema
    .array()
    .min(1)
    .max(10, 'Die maximale Anzahl beträgt 10'),
});

const DEFAULT_POSITION_VALUES: PositionFieldValue = {
  area: undefined,
  boxesQty: NaN,
  dangerousGoods: '',
  ldm: undefined,
  marking: '',
  pack: '',
  volume: undefined,
  weight: NaN,
  description: '',
};

export const DEFAULT_ADD_POSITIONS_FORM_VALUES: PositionsFormValues = {
  positions: [DEFAULT_POSITION_VALUES],
};

export function useAddPositionsFormContext() {
  const form = useFormContext<PositionsFormValues>();
  const { append, ...restFieldArrayMethods } = useFieldArray({
    control: form.control,
    name: 'positions',
  });

  const addProduct = useCallback(
    () => append(DEFAULT_POSITION_VALUES),
    [append]
  );

  return {
    form,
    addProduct,
    productsFieldArray: {
      append,
      ...restFieldArrayMethods,
    },
  };
}

export type PositionsFormValues = z.infer<typeof positionsFormValidationSchema>;
export type PositionFieldValue = z.infer<typeof positionValidationSchema>;
