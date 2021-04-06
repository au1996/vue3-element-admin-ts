import type { App } from 'vue'

declare interface Window {
  // Global vue app instance
  __APP__: App<Element>
}

declare module '*.png' {
  const value: string
  export = value
}
