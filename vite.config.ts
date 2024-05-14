import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: [
      '@emotion/react',
      '@emotion/styled',
      '@mui/material/Unstable_Grid2/Grid2',
      '@mui/material/Tooltip',
    ],
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    tsconfigPaths(),
    svgr(),
  ],
  resolve: {
    alias: {
      '@styles': resolve(__dirname, 'src/shared/styles'),
      '@assets': resolve(__dirname, 'src/shared/assets'),
    },
  },
});
