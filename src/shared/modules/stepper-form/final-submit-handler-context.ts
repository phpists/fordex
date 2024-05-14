import { createContext } from 'react';

export type FinalSubmitHandlerContextValue = () => void;
export const FinalSubmitHandlerContext =
  createContext<FinalSubmitHandlerContextValue>(() => null);
