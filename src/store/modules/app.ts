import Cookies from 'js-cookie'
import { IStateApp } from '#/store'

const state: IStateApp = {
  device: 'desktop',
  size: Cookies.get('size') || 'medium',
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!Cookies.get('sidebarStatus') : false,
    withoutAnimation: false
  }
}

const mutations = {
  TOGGLE_SIDEBAR: (state: IStateApp) => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', '1')
    } else {
      Cookies.set('sidebarStatus', '')
    }
  },
  CLOSE_SIDEBAR: (state: IStateApp, withoutAnimation: boolean) => {
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
    Cookies.set('sidebarStatus', '')
  },
  TOGGLE_DEVICE: (state: IStateApp, device: string) => {
    state.device = device
  },
  SET_SIZE: (state: IStateApp, size: string) => {
    state.size = size
    Cookies.set('size', size)
  }
}

const actions = {
  toggleSideBar({ commit }: any) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }: any, { withoutAnimation }: any) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }: any, device: string) {
    commit('TOGGLE_DEVICE', device)
  },
  setSize({ commit }: any, size: string) {
    commit('SET_SIZE', size)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
