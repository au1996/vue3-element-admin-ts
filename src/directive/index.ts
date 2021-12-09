const componentFiles = import.meta.globEager('./*.ts')
const pathList: any[] = []

for (const path in componentFiles) {
  pathList.push(path)
}

export default {
  install(Vue: any) {
    pathList.forEach((path) => {
      const moduleName = path.replace(/^\.\/(.*)\.\w+$/, '$1')
      const value = componentFiles[path]
      Vue.directive(moduleName, value.default)
    })
  }
}
