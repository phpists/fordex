import { useLayoutEffect } from 'react';
import { useAppLayoutStore } from '../model/use-app-layout-store';

export function usePageName(pageName: string) {
  const setPageName = useAppLayoutStore((store) => store.setPageName);

  useLayoutEffect(() => {
    setPageName(pageName);
  }, [pageName, setPageName]);
}
