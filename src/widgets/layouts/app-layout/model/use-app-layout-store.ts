import { create } from 'zustand';
import { HeaderContentNodes } from './header-content-node';

export interface AppLayoutState {
  pageName: string;
  loader: boolean;
  headerContentNodes: HeaderContentNodes;
}

export interface AppLayoutActions {
  setPageName: (pageName: string) => void;
  showLoader: () => void;
  hideLoader: () => void;
  updateNodes: (nodes: HeaderContentNodes) => void;
  clearNodes: () => void;
}

export const useAppLayoutStore = create<AppLayoutActions & AppLayoutState>()(
  (set) => ({
    pageName: '',
    paginatedDataComponentsStore: null,
    loader: false,
    headerContentNodes: [],
    setPageName: (pageName) => set({ pageName }),
    hideLoader: () => set({ loader: false }),
    showLoader: () => set({ loader: true }),
    updateNodes: (nodes) => set({ headerContentNodes: [...nodes] }),
    clearNodes: () => set({ headerContentNodes: [] }),
  })
);
