import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import { RouteRecordRaw } from 'vue-router'

declare interface IStateApp {
  device: string
  size: string
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
  }
}

declare interface IStatePermission {
  routes: RouteRecordRaw[]
  addRoutes: RouteRecordRaw[]
}

declare interface IStateTagsView {
  visitedViews: any[]
  cachedViews: any[]
}

declare interface IStateUser {
  token: string | undefined
  roles: string | undefined
  name: string | undefined
  avatar: string | undefined
  introduction: string
}

declare interface IState {
  app: IStateApp
  permission: IStatePermission
  tagsView: IStateTagsView
  user: IStateUser
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<IState>
  }
}
