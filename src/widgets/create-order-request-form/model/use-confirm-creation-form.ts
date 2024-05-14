import { useFormContext } from 'react-hook-form';
import { z } from 'zod';

export const confirmCreationFormValidation = z.object({
  confirmed: z.boolean().refine((value) => value === true, {
    message: 'Confirmation is required',
    path: ['confirmed'],
  }),
});

export type ConfirmCreationFormValues = z.infer<
  typeof confirmCreationFormValidation
>;

export const useConfirmCreationForm = () => {
  return useFormContext<ConfirmCreationFormValues>();
};
