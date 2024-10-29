import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import {
  createStyleImportPlugin,
  ElementPlusResolve
} from 'vite-plugin-style-import'

const plugins = [vue(), vueJsx()]
if (process.env.NODE_ENV === 'production') {
  plugins.push(
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      globsExclude: ['./src/components/**'],
      resolvers: [ElementPlusResolver()]
    }),
    createStyleImportPlugin({
      resolves: [ElementPlusResolve()],
      libs: [
        {
          libraryName: 'element-plus',
          resolveStyle: name => {
            const names = [
              'el-message',
              'el-message-box',
              'el-notification',
              'el-descriptions',
              'el-descriptions-item'
            ]
            if (names.includes(name)) {
              return `element-plus/theme-chalk/${name}.css`
            }
            return ''
          }
        }
      ]
    })
  )
}

// https://vitejs.dev/config/
export default defineConfig({
  envDir: resolve(__dirname, './env'),
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  server: {
    host: true
  },
  base: './',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.split('node_modules/')[1].split('/')[0]
          }
        }
      }
    }
  },
  plugins
})
