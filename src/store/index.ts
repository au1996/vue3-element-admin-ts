import { createStore } from 'vuex'

// Vite supports importing multiple modules from the file system using the special import.meta.glob function
// see https://cn.vitejs.dev/guide/features.html#glob-%E5%AF%BC%E5%85%A5
const modulesFiles = import.meta.globEager('./modules/*.ts')
const pathList: string[] = []

for (const path in modulesFiles) {
  pathList.push(path)
}

const modules = pathList.reduce((modules: { [x: string]: any }, modulePath: string) => {
  const moduleName = modulePath.replace(/^\.\/modules\/(.*)\.\w+$/, '$1')
  const value = modulesFiles[modulePath]
  modules[moduleName] = value.default
  return modules
}, {})

const store = createStore({
  modules
})

export default store
