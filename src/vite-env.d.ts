/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

import { AxiosRequestConfig } from 'axios';

declare module 'axios' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export interface InternalAxiosRequestConfig<D = any>
    extends AxiosRequestConfig<D> {
    headers: AxiosRequestHeaders;
    _retry?: boolean;
  }
}
