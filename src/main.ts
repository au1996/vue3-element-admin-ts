import { createApp, createVNode } from 'vue'

// polyfill
// import 'core-js'
// import 'regenerator-runtime/runtime'

// element-plus
import ElementPlus, { ElIcon } from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons-vue'

// global css
import './styles/index.scss'

import App from './App.vue'
import router from './router'
import store from './store'
import Directives from './directive'

// permission control
import './permission'

// utils
import { DateFormat } from './utils/util'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

const app = createApp(App)

app.config.globalProperties.$DateFormat = DateFormat

app.use(ElementPlus).use(Directives).use(router).use(store).mount('#app')

const Icon = (props: { name: string; size: number | string; color: string }) => {
  const { name, size, color } = props
  return createVNode(
    ElIcon,
    {
      size: size || 16,
      color
    },
    () => createVNode(Icons[name as keyof typeof Icons])
  )
}

app.component('I', Icon)

export default app
