import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

function injectGaIds(gaIds: string[]): Plugin {
  const gaIdsJson = JSON.stringify(gaIds)

  return {
    name: 'inject-ga-ids',
    transformIndexHtml(html) {
      return html.replace('__GA_IDS_JSON__', gaIdsJson)
    }
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const gaIds = env.VITE_GA_IDS ? env.VITE_GA_IDS.split(',').map(id => id.trim()) : []

  return {
    plugins: [react(), injectGaIds(gaIds)],
    base: '/ga-test/',
  }
})
