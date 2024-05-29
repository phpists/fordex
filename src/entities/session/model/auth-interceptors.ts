import { AxiosError } from 'axios';

import {
  AuthorizeSessionResponseDTO,
  SESSION_API_URLS,
  refreshSession,
} from 'shared/api';
import { httpClient } from 'shared/utils';

export function interceptRequestWithAuth(accessToken: string) {
  return httpClient.interceptors.request.use((axiosConfig) => {
    axiosConfig.headers.Authorization = `Bearer ${accessToken}`;

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
          const { data } = await refreshSession(refreshToken);
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
        // localStorage.removeItem('fordexAuth');
        // window.location.pathname = '/sign-in';
        if (error.response?.config.url !== SESSION_API_URLS.refreshSession) {
          try {
            const { data } = await refreshSession(refreshToken);
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
            return Promise.reject(error);
          }
        } else {
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
