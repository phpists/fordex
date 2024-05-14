import { PropsWithChildren, useMemo, useState } from 'react';

import { FABVisibilityContext } from '../utils/fab-visibility-context';

export function FABVisibility({ children }: PropsWithChildren) {
  const [isShown, setIsShown] = useState(false);

  return (
    <FABVisibilityContext.Provider
      value={useMemo(
        () => ({ isShown, toggle: (value) => setIsShown(value) }),
        [isShown]
      )}
    >
      {children}
    </FABVisibilityContext.Provider>
  );
}
