import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formValidationSchema = z.object({
  reasonMessage: z.string().min(0).trim(),
});

export type CancelOrderFormValues = z.infer<typeof formValidationSchema>;

export function useCancelOrderForm() {
  return useForm<CancelOrderFormValues>({
    defaultValues: {
      reasonMessage: '',
    },
    resolver: zodResolver(formValidationSchema),
  });
}
