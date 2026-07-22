/// <reference types="vitest/config" />
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  build: {
    rollupOptions: {
      // React is external in the SSR build, so naming it here fails there.
      output: isSsrBuild
        ? {}
        : {
            manualChunks: {
              charts: ['recharts'],
            },
          },
    },
  },
  test: {
    // One worker, one module graph: the files share almost all of it, and
    // loading it once took the import total from ~131s to ~52s. `isolate:
    // false` alone changed nothing and `deps.optimizer.ssr` was worse.
    isolate: false,
    fileParallelism: false,
  },
  resolve: {
    alias: {
      '@icons': fileURLToPath(new URL('./src/Design/icons/ICON_SET.ts', import.meta.url)),
      '@doodle': fileURLToPath(new URL('./src/Design/icons/doodle/index.ts', import.meta.url)),
    },
  },
}))
