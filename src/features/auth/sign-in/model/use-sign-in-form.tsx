import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAuthorizeSessionMutationState } from 'entities/session';

const signInFormSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1, ''),
  remember: z.boolean(),
});

export function useSignInForm() {
  const [state] = useAuthorizeSessionMutationState();

  return useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      username: '',
      password: '',
      remember: false,
    },
    disabled: state?.status === 'pending',
  });
}

export type FormValues = z.infer<typeof signInFormSchema>;
