import {
  AUTH_LOCAL_STORAGE_KEY,
  getAuthCredentialsFromLocalStorage,
} from '../model/auth-local-storage-manager';
import { useSessionStore } from '../model/use-session-store';
import { useEffect, useState } from 'react';

export function useIsAuthorized() {
  const hasCredentialsInStore = !!useSessionStore((store) => store.credentials);
  const [hasCredentialsInStorage, setHasCredentialsInStorage] = useState(
    () => !!getAuthCredentialsFromLocalStorage()
  );

  useEffect(() => {
    const listener = (event: StorageEvent) => {
      if (event.key === AUTH_LOCAL_STORAGE_KEY) {
        setHasCredentialsInStorage(!!getAuthCredentialsFromLocalStorage());
      }
    };

    window.addEventListener('storage', listener);

    return () => window.removeEventListener('storage', listener);
  }, []);

  return hasCredentialsInStorage || hasCredentialsInStore;
}
