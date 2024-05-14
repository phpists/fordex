import { PropsWithChildren, useEffect } from 'react';

import {
  AddressesContext,
  AddressesContextValue,
} from '../lib/addresses-context';
import { useAddressesStore } from '../model/use-addresses-store';

export function AddressesInputProvider({ children }: PropsWithChildren) {
  const initState = useAddressesStore((store) => store.initState);

  useEffect(() => {
    const unsubscribe = initState();

    return () => unsubscribe();
  });

  return (
    <AddressesContext.Provider value={AddressesContextValue.PROVIDER_FOUND}>
      {children}
    </AddressesContext.Provider>
  );
}
