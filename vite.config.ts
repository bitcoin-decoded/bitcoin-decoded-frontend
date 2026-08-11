/// <reference types="vitest/config" />
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react-swc'

// `vercel dev` cannot serve this app: the vercel.json rewrite sends every route
// to /404.html, which only exists after the prerender step. So for full-stack
// local dev, `npm run dev` (Vite serves the hash-routed SPA) proxies /api to a
// deployed backend when VITE_DEV_API_TARGET is set, e.g.
//   VITE_DEV_API_TARGET=https://bitcoin-decoded.vercel.app npm run dev
// cookieDomainRewrite "" drops the cookie Domain so the httpOnly session cookie
// sticks to localhost (Secure cookies are accepted on localhost). Opt-in: with
// the var unset, dev behaves exactly as before. NB: it hits the target's real DB.
const devApiTarget = process.env.VITE_DEV_API_TARGET;

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  server: devApiTarget
    ? {
        proxy: {
          "/api": {
            target: devApiTarget,
            changeOrigin: true,
            secure: true,
            cookieDomainRewrite: "",
          },
        },
      }
    : undefined,
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
