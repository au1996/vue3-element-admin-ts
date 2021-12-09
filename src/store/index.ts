import { createStore } from 'vuex'
import { State } from '#/store'

const modulesFiles = require.context('./modules', true, /\.ts$/)
const modules = modulesFiles.keys().reduce((modules: any, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = createStore<State>({
  modules
})

export default store
