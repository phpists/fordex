import { QueryClientProvider as TanstackQueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

import { queryClient } from 'shared/utils/query-client';

interface QueryClientProvider {
  children: ReactNode;
}

export function QueryClientProvider({ children }: QueryClientProvider) {
  return (
    <TanstackQueryClientProvider client={queryClient}>
      {children}
    </TanstackQueryClientProvider>
  );
}
