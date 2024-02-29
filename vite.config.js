import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'


// https://vitejs.dev/config/
export default defineConfig({
  base: '/vue-weather-widget/',
  plugins: [
    vue(),
    svgLoader({
      defaultImport: 'url' // or 'raw'
    })
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
