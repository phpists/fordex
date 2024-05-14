import { AuthorizedSessionCredentials } from './types';

export const AUTH_LOCAL_STORAGE_KEY = 'fordexAuth';

export function getAuthCredentialsFromLocalStorage() {
  const authCredentialsJSON = window.localStorage.getItem(
    AUTH_LOCAL_STORAGE_KEY
  );

  return authCredentialsJSON
    ? (JSON.parse(authCredentialsJSON) as AuthorizedSessionCredentials)
    : null;
}

export function clearAuthCredentialsInLocalStorage() {
  window.localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
  window.dispatchEvent(
    new StorageEvent('storage', {
      key: AUTH_LOCAL_STORAGE_KEY,
    })
  );
}

export function setAuthCredentialsInLocalStorage(
  credentials: AuthorizedSessionCredentials
) {
  window.localStorage.setItem(
    AUTH_LOCAL_STORAGE_KEY,
    JSON.stringify(credentials)
  );
  window.dispatchEvent(
    new StorageEvent('storage', {
      key: AUTH_LOCAL_STORAGE_KEY,
    })
  );
}
