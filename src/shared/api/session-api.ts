import { httpClient } from 'shared/utils';

export interface SessionCredentialsDTO {
  username: string;
  password: string;
}

export interface AuthorizeSessionResponseDTO {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface ProfileInfoDTO {
  id: number;
  title: string;
  email: string;
  countryZipCity?: string;
  streetBuilding?: string;
}

export interface ProfileInfoResponseDTO {
  data: ProfileInfoDTO;
}

export const SESSION_API_URLS = {
  authorizeSession: '/v1/auth/token',
  refreshSession: '/v1/auth/refresh',
  profileInfo: `/api/weborder/client/profile`,
};

export function authorizeSession(credentials: SessionCredentialsDTO) {
  return httpClient.post<AuthorizeSessionResponseDTO>(
    SESSION_API_URLS.authorizeSession,
    credentials
  );
}

export function refreshSession(
  refreshToken: string,
  abortSignal?: AbortSignal
) {
  return httpClient.post<AuthorizeSessionResponseDTO>(
    SESSION_API_URLS.refreshSession,
    { refreshToken },
    { signal: abortSignal }
  );
}

export function getProfileInfo() {
  return httpClient.get<ProfileInfoResponseDTO>(SESSION_API_URLS.profileInfo);
}
