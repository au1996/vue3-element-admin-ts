import { UserConfigExport, ConfigEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport => {
  const prodMock = true
  return {
    // base: '/',
    base: command === 'serve' ? '/' : '/vue3-element-admin-ts/',
    plugins: [
      vue(),
      viteMockServe({
        supportTs: true,
        mockPath: 'mock',
        localEnabled: command === 'serve',
        prodEnabled: command !== 'serve' && prodMock,
        injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `
      })
    ],
    resolve: {
      alias: {
        '@': resolve(process.cwd(), '/src'),
        '#': resolve(process.cwd(), '/types')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/styles/variables.scss";`
        }
      }
    },
    server: {
      port: 3002,
      open: false,
      proxy: {
        '/api': {
          target: 'http://admin.xueyueob.cn/api',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp('^/api'), '')
        }
      }
    },
    build: {
      // sourcemap: true,
      manifest: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue', 'vue-router', 'vuex'],
            'element-plus': ['element-plus'],
            echarts: ['echarts']
          }
        }
      },
      chunkSizeWarningLimit: 500
    }
  }
}
