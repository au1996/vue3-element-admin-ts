import type { App } from 'vue'

declare interface Window {
  // Global vue app instance
  __APP__: App<Element>
}

declare module '*.vue' {
  import { defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent>
  export default component
}

declare module '*.png'
