import { createApp } from 'vue'

// element-plus
import ElementPlus from 'element-plus'
import 'element-plus/packages/theme-chalk/src/base.scss'
import 'element-plus/lib/theme-chalk/index.css'

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

const app = createApp(App)
app.use(ElementPlus)
app.use(Directives)
app.use(router).use(store).mount('#app')

app.provide('$DateFormat', DateFormat)

export default app
