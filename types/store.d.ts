import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import { State } from '/@/store'

declare interface IStateApp {
  device: string
  size: string
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
  }
}

declare interface IStateTagsView<T> {
  visitedViews: T[]
  cachedViews: T[]
}

declare interface IStatePermission<T> {
  routes: T[]
  addRoutes: T[]
}

declare interface IState {
  app: IStateApp
  tagsView: IStateTagsView
  permission: IStatePermission
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<IState>
  }
}
