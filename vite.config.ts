import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      dirs: ['src/components'],
      dts: true,
      extensions: ['vue']
    }),
    AutoImport({
      imports: ['vue', 'vue-router', 'vue-i18n', 'vee-validate', 'pinia'],
      vueTemplate: true,
      dts: true
    })
  ],
  resolve: {
    // preserveSymlinks:true,
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/style/_variables.scss";`
      }
    }
  }
})
