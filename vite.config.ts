import { UserConfigExport, ConfigEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport => {
  const root = process.cwd()
  return {
    root,
    base: '/', // 开发或生产环境服务的 公共基础路径。
    plugins: [
      vue(),
      viteMockServe({
        supportTs: true,
        mockPath: 'mock',
        localEnabled: command === 'serve',
        prodEnabled: command !== 'serve',
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
    server: {
      port: 3001,
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
            'element-plus': ['element-plus']
          }
        }
      },
      chunkSizeWarningLimit: 500
    }
  }
}
