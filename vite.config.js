import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/chatbot': {
        target: 'https://ihp.ind.in',
        changeOrigin: true,
        secure: true, // keep true since it's a valid HTTPS cert; set false only if using self-signed
      },
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
