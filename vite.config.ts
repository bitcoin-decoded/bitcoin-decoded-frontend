import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@icons': fileURLToPath(new URL('./src/Design/icons/ICON_SET.ts', import.meta.url)),
    },
  },
})
