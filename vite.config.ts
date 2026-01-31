import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  root: '.',
  server: {
    port: 5173,
    open: true
  }
})
