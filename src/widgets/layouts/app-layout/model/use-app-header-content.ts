import { useEffect, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useUnmount } from 'react-use';

import { useAppLayoutStore } from './use-app-layout-store';
import { HeaderContentNodes } from './header-content-node';

export function useAppHeaderContent(
  getContentNodes: () => HeaderContentNodes = () => [],
  deps: readonly unknown[]
) {
  const store = useAppLayoutStore(
    useShallow(({ updateNodes, clearNodes }) => ({ updateNodes, clearNodes }))
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const contentNodes = useMemo(() => getContentNodes(), deps);

  // Update content nodes from hook's argument, if they are provided
  useEffect(() => {
    if (contentNodes) {
      store.updateNodes(contentNodes);
    }
  }, [contentNodes, store]);

  useUnmount(store.clearNodes);
}
