import { AxiosError } from 'axios';

import {
  AuthorizeSessionResponseDTO,
  SESSION_API_URLS,
  refreshSession,
} from 'shared/api';
import { httpClient } from 'shared/utils';
import { getAuthCredentialsFromLocalStorage } from './auth-local-storage-manager';

const handleGetTokenFromStorage = (): string | undefined => {
  const authData = localStorage.getItem('fordexAuth');

  if (authData) {
    try {
      const accessToken = JSON.parse(authData)?.accessToken;
      return accessToken;
    } catch {
      return undefined;
    }
  } else {
    return undefined;
  }
};

export function interceptRequestWithAuth(accessToken: string) {
  return httpClient.interceptors.request.use((axiosConfig) => {
    axiosConfig.headers.Authorization = `Bearer ${handleGetTokenFromStorage() ?? accessToken}`;

    return axiosConfig;
  });
}

export function interceptResponseWithAuth(
  refreshToken: string,
  onRefreshSuccess: (credentials: AuthorizeSessionResponseDTO) => void,
  onRefreshError: () => void
) {
  return httpClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (
        error instanceof AxiosError &&
        error.response &&
        error.response.status !== 401 &&
        error.response.status !== 400 &&
        error.config &&
        !error.config._retry
      ) {
        error.config._retry = true;

        try {
          const savedAuthCredentials = getAuthCredentialsFromLocalStorage();
          const { data } = await refreshSession(
            savedAuthCredentials?.refreshToken ?? refreshToken
          );
          const { headers, ...restConfig } = error.config;
          onRefreshSuccess(data);
          return httpClient({
            ...restConfig,
            headers: {
              ...headers,
              Authorization: data.accessToken,
            },
          });
        } catch (e) {
          onRefreshError();
          return Promise.reject(error);
        }
      }
      if (error.response.status == 401) {
        if (error.response?.config.url !== SESSION_API_URLS.refreshSession) {
          try {
            const savedAuthCredentials = getAuthCredentialsFromLocalStorage();
            const { data } = await refreshSession(
              savedAuthCredentials?.refreshToken ?? refreshToken
            );
            const { headers, ...restConfig } = error.config;
            onRefreshSuccess(data);
            return httpClient({
              ...restConfig,
              headers: {
                ...headers,
                Authorization: data.accessToken,
              },
            });
          } catch (e) {
            localStorage.removeItem('fordexAuth');
            window.location.pathname = '/sign-in';
            return Promise.reject(error);
          }
        } else {
          return Promise.reject(error);
        }
      }

      return Promise.reject(error);
    }
  );
}

export function clearAuthInterceptors(
  requestInterceptorId: number,
  responseInterceptorId: number
) {
  httpClient.interceptors.request.eject(requestInterceptorId);
  httpClient.interceptors.response.eject(responseInterceptorId);
}
