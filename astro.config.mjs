// @ts-check
import { defineConfig } from 'astro/config'
import serviceWorker from 'astrojs-service-worker'

export default defineConfig({
  output: 'static',
  integrations: [serviceWorker()],
})
