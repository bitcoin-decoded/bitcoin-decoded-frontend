import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Only the client build splits. The SSR build leaves React external, so
      // naming it in `manualChunks` there fails outright.
      output: isSsrBuild
        ? {}
        : {
            // Splitting does not reduce what a first visit downloads:
            // everything is still imported eagerly, because route-level lazy
            // loading would suspend during `renderToString` and the build
            // renders every route. What it buys is cache granularity.
            // Publishing a chapter currently invalidates Recharts along with
            // it, and that changes a few times a year.
            manualChunks: {
              charts: ['recharts'],
            },
          },
    },
  },
  resolve: {
    alias: {
      '@icons': fileURLToPath(new URL('./src/Design/icons/ICON_SET.ts', import.meta.url)),
      '@doodle': fileURLToPath(new URL('./src/Design/icons/doodle/index.ts', import.meta.url)),
    },
  },
}))
