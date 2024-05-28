import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { AxiosError } from 'axios';

import { refreshSession } from 'shared/api';

import {
  clearAuthInterceptors,
  interceptRequestWithAuth,
  interceptResponseWithAuth,
} from './auth-interceptors';
import { SessionStore } from './types';
import {
  clearAuthCredentialsInLocalStorage,
  getAuthCredentialsFromLocalStorage,
  setAuthCredentialsInLocalStorage,
} from './auth-local-storage-manager';

const DEFAULT_STATE = {
  shouldRemember: false,
  credentialsRequestInterceptorId: NaN,
  credentialsResponseInterceptorId: NaN,
  credentialsRefreshTimeoutId: NaN,
  credentialsLoading: true,
  credentialsRefreshing: false,
  credentials: null,
  _authExpirationHandler: null,
};

export const useSessionStore = create<SessionStore>()(
  devtools(
    (set, get) => ({
      ...DEFAULT_STATE,
      _makeRefreshToken: async () => {
        const {
          credentials,
          _authExpirationHandler: authExpirationHandler,
          setCredentials,
          clearState,
          shouldRemember,
        } = get();
        if (credentials) {
          set({ credentialsRefreshing: true });
          const savedAuthCredentials = getAuthCredentialsFromLocalStorage();
          try {
            const response = await refreshSession(
              savedAuthCredentials?.refreshToken ?? credentials?.refreshToken
            );
            if (response?.status === 200) {
              setCredentials(response.data, shouldRemember);
              set({ credentialsRefreshing: false });
            } else {
              authExpirationHandler?.();
              clearState();
            }
          } catch {
            authExpirationHandler?.();
            clearState();
          }
        }
      },
      clearState: () => {
        const {
          _stopInterceptAuthCredentials: stopInterceptAuthCredentials,
          _untrackTokenExpiration: untrackTokenExpiration,
        } = get();
        stopInterceptAuthCredentials();
        untrackTokenExpiration();

        set({ ...DEFAULT_STATE, credentialsLoading: false });
      },
      setCredentials: (authCredentials, shouldRemember) => {
        const {
          _trackTokenExpiration,
          _interceptAuthCredentials,
          _untrackTokenExpiration,
        } = get();
        set({
          shouldRemember,
          credentials: authCredentials,
        });

        if (shouldRemember) {
          setAuthCredentialsInLocalStorage(authCredentials);
        } else {
          clearAuthCredentialsInLocalStorage();
        }

        _untrackTokenExpiration();
        _interceptAuthCredentials();
        _trackTokenExpiration();
      },
      _trackTokenExpiration: () => {
        const {
          credentials,
          _makeRefreshToken: makeRefreshToken,
          _untrackTokenExpiration: untrackTokenExpiration,
        } = get();
        if (credentials) {
          const timerId = window.setTimeout(
            () => {
              makeRefreshToken();
              untrackTokenExpiration();
            },
            credentials.expiresIn * 1000 - 10000
          );
          set({ credentialsRefreshTimeoutId: timerId });
        }
      },
      _untrackTokenExpiration: () => {
        const { credentialsRefreshTimeoutId } = get();
        clearTimeout(credentialsRefreshTimeoutId);
      },
      _interceptAuthCredentials: () => {
        const {
          setCredentials,
          clearState,
          _authExpirationHandler: authExpirationHandler,
          credentials,
          shouldRemember,
        } = get();
        if (credentials) {
          const requestInterceptorId = interceptRequestWithAuth(
            credentials.accessToken
          );

          const responseInterceptorId = interceptResponseWithAuth(
            credentials.refreshToken,
            (credentials) => setCredentials(credentials, shouldRemember),
            () => {
              authExpirationHandler?.();
              clearState();
            }
          );

          set({
            credentialsRequestInterceptorId: requestInterceptorId,
            credentialsResponseInterceptorId: responseInterceptorId,
          });
        }
      },
      _stopInterceptAuthCredentials: () => {
        const {
          credentialsRequestInterceptorId,
          credentialsResponseInterceptorId,
        } = get();

        clearAuthInterceptors(
          credentialsRequestInterceptorId,
          credentialsResponseInterceptorId
        );

        set({
          credentialsRequestInterceptorId: NaN,
          credentialsResponseInterceptorId: NaN,
        });
      },
      initializeState: (onAuthExpiration) => {
        const abortController = new AbortController();

        const unsubscribe = () => {
          abortController.abort();
          get().clearState();
        };
        const init = async () => {
          const { setCredentials } = get();
          const savedAuthCredentials = getAuthCredentialsFromLocalStorage();

          if (savedAuthCredentials) {
            try {
              const { data: refreshedCredentials }: any = await refreshSession(
                savedAuthCredentials.refreshToken,
                abortController.signal
              ).catch((err: AxiosError) => {
                if (err?.response?.status === 401) {
                  unsubscribe();
                  clearAuthCredentialsInLocalStorage();
                  onAuthExpiration?.();
                  set({ credentialsLoading: false });
                  window.location.pathname = '/sign-in';
                }
              });

              setCredentials(refreshedCredentials, true);
              set({
                credentialsLoading: false,
                _authExpirationHandler: onAuthExpiration,
              });
            } catch {
              if (!abortController.signal.aborted) {
                clearAuthCredentialsInLocalStorage();
                onAuthExpiration?.();
                set({ credentialsLoading: false });
              }
            }
          } else {
            onAuthExpiration?.();
            set({ credentialsLoading: false });
          }
        };

        void init();

        return unsubscribe;
      },
    }),
    { name: 'session-store' }
  )
);
