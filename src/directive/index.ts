const directiveFiles: any = require.context('./', true, /\.ts$/)

export default {
  install(Vue: any) {
    directiveFiles.keys().forEach((path: string) => {
      if (!path.includes('index.ts')) {
        const moduleName = path.replace(/^\.\/(.*)\.\w+$/, '$1')
        const value = directiveFiles(path)
        Vue.directive(moduleName, value.default)
      }
    })
  }
}
