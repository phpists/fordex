import { AuthorizeSessionResponseDTO } from 'shared/api';

export type AuthorizedSessionCredentials = AuthorizeSessionResponseDTO;

export interface SessionStore {
  shouldRemember: boolean;
  credentialsRequestInterceptorId: number;
  credentialsResponseInterceptorId: number;
  credentialsRefreshTimeoutId: number;
  credentialsRefreshing: boolean;
  credentialsLoading: boolean;
  credentials: null | AuthorizedSessionCredentials;
  _makeRefreshToken: () => Promise<void>;
  _trackTokenExpiration: () => void;
  _untrackTokenExpiration: () => void;
  setCredentials: (
    authCredentials: AuthorizeSessionResponseDTO,
    shouldRemember: boolean
  ) => void;
  _interceptAuthCredentials: () => void;
  _stopInterceptAuthCredentials: () => void;
  initializeState: (onAuthExpiration: (() => void) | null) => () => void;
  clearState: () => void;
  _authExpirationHandler: (() => void) | null;
}
