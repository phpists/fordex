import { useFormContext } from 'react-hook-form';
import { addressDTOSchema } from 'shared/api/address-api';
import { z } from 'zod';

export const billingAddressSchema = z.object({
  name: z.string().min(1),
  country: addressDTOSchema,
  city: z.string().min(1),
  street: z.string().min(1),
});

export const billingAddressFormValidationSchema = z.object({
  manualAddressChecked: z.boolean(),
  address: z
    .object({
      manualAddress: billingAddressSchema,
    })
    .or(
      z.object({
        selectedAddress: z.string().min(1),
      })
    ),
});

export const DEFAULT_MANUAL_ADDRESS: BillingAddressFieldValue = {
  city: '',
  country: {
    value: '',
    label: '',
  },
  name: '',
  street: '',
};
export const DEFAULT_SELECTED_ADDRESS = '';
export const DEFAULT_BILLING_ADDRESS_FORM_VALUES: BillingAddressFormValues = {
  manualAddressChecked: false,
  address: {
    selectedAddress: DEFAULT_SELECTED_ADDRESS,
    manualAddress: DEFAULT_MANUAL_ADDRESS,
  },
};

export type BillingAddressFieldValue = z.infer<typeof billingAddressSchema>;
export type BillingAddressFormValues = z.infer<
  typeof billingAddressFormValidationSchema
>;

export function useBillingAddressFormContext() {
  return useFormContext<BillingAddressFormValues>();
}
