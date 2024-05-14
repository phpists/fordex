/**
 * Context helper to ensure that inputs which retrieve cities/countries
 * wrapped with AddressesInputProvider component, which
 * initializes AddressesStore by 'initState' method
 * (see in '../model/use-addresses-store.ts')
 */

import { createContext, useContext } from 'react';

export enum AddressesContextValue {
  PROVIDER_NOT_FOUND,
  PROVIDER_FOUND,
}

export const AddressesContext = createContext(
  AddressesContextValue.PROVIDER_NOT_FOUND
);

export function useAddressesContext() {
  const contextValue = useContext(AddressesContext);

  if (contextValue === AddressesContextValue.PROVIDER_NOT_FOUND) {
    throw new Error(
      'The component is not wrapped with "AddressesInputProvider"'
    );
  }
}
