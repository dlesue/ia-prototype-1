import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, '../shared'),
      '@project': path.resolve(__dirname, '..'),
    },
  },
  server: {
    port: 5401,
    fs: {
      allow: ['..'],
    },
  },
})
