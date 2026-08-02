import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repoName = 'cunos_TempHonepage_LeadMagenet'

// Multi-page input gives us a real static HTML file per route, with proper
// per-page <head> meta (title, description, OG, JSON-LD). Crawlers and AI
// engines that don't execute JS still get a fully indexable document.
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_ACTIONS ? `/${repoName}/` : '/',
  server: {
    port: 5190,
    strictPort: false,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        seniorFinanceSupport: resolve(__dirname, 'services/senior-finance-support/index.html'),
        cashflowForecast: resolve(__dirname, 'services/cashflow-forecast/index.html'),
        managementReport: resolve(__dirname, 'services/management-report/index.html'),
      },
    },
  },
})
