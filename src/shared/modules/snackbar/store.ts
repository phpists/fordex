import { SnackbarOrigin } from '@mui/material';
import { createStore, useStore } from 'zustand';
import { nanoid } from 'nanoid';

export interface SnackbarAction {
  label: string;
  onClick: () => void;
}
export interface SnackbarMessageModel {
  id: string;
  message: string;
  type?: 'warning' | 'success' | 'info' | 'error';
  canClose?: boolean;
  actions?: SnackbarAction[];
  autoHideDuration?: number;
  origin?: SnackbarOrigin;
}

interface SnackbarStore {
  snackbarMessage: SnackbarMessageModel | null;
  show: (snackbarMessage: Omit<SnackbarMessageModel, 'id'>) => void;
  hide: () => void;
}

type SnackbarStoreSelector<T> = (store: SnackbarStore) => T;

const DEFAULT_STORE_SELECTOR: SnackbarStoreSelector<SnackbarStore> = (store) =>
  store;

const snackbarStore = createStore<SnackbarStore>()((set) => ({
  snackbarMessage: null,
  show: (data) => set({ snackbarMessage: { ...data, id: nanoid() } }),
  hide: () => set({ snackbarMessage: null }),
}));

export function useSnackbarStore<T = SnackbarStore>(
  selector: SnackbarStoreSelector<T> = DEFAULT_STORE_SELECTOR as SnackbarStoreSelector<T>
) {
  return useStore(snackbarStore, selector);
}

export const snackbar = {
  show: (...args: Parameters<SnackbarStore['show']>) =>
    snackbarStore.getState().show(...args),
};
