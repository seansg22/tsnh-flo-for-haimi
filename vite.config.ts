import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker'

const buildTime = new Date().toISOString()

function versionJsonPlugin(): Plugin {
  return {
    name: 'version-json',
    // Emit version.json into the build output root
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'version.json',
        source: JSON.stringify({ buildTime }),
      })
    },
    // Serve version.json during dev
    configureServer(server) {
      server.middlewares.use('/version.json', (_req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Cache-Control', 'no-store')
        res.end(JSON.stringify({ buildTime }))
      })
    },
  }
}

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/tsnh-flo-for-haimi/' : '/',
  define: {
    __BUILD_TIME__: JSON.stringify(buildTime),
  },
  server: {
    host: '0.0.0.0',
  },
  plugins: [
    react(),
    checker({ typescript: true }),
    versionJsonPlugin(),
  ],
})
