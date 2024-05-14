import { createContext } from 'react';

interface FABVisibilityContextValue {
  isShown: boolean;
  toggle: (value: boolean) => void;
}

export const FABVisibilityContext = createContext<FABVisibilityContextValue>({
  isShown: false,
  toggle: () => null,
});
