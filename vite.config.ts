/// <reference types="vitest/config" />
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
  test: {
    // The suite spends its time loading modules, not asserting: a run reports
    // ~1.5s of tests against a two-minute import total. Ten files were each
    // paying for their own copy of a graph they overwhelmingly share, with
    // `nodeSafety` pulling in the whole application on its own.
    //
    // One worker, one graph, loaded once. Measured warm, three runs each:
    // import fell from ~131s to ~52s and wall time from ~65s to ~54s. The
    // wall-clock gain is the smaller of the two because the parallelism that
    // used to hide some of the loading is gone; there is simply much less
    // loading left to hide.
    //
    // Two other approaches were measured and rejected, so they need not be
    // tried again: `isolate: false` on its own changed nothing (~70s), and
    // `deps.optimizer.ssr` made it clearly worse (~88s).
    //
    // Sharing the registry is safe here because nothing under test mutates
    // module state: the caches that exist, the address table and the colour
    // tokens, are built once from constants and only ever read. Should the
    // suite ever grow a wide set of genuinely independent files, parallelism
    // would start to pay again and this is the line to revisit.
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
