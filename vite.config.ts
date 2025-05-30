import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 👇 Ajoute ceci pour que Vercel ne renvoie pas 404 en route directe
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'
  },
  // 👇 Très important pour gérer les routes client (SPA)
  server: {
    historyApiFallback: true
  }
})
