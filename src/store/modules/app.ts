import { Module } from 'vuex'
import { App } from '#/store'

const appModule: Module<App, any> = {
  namespaced: true,
  state: {
    device: 'desktop',
    size: 'medium',
    sidebar: {
      opened: true,
      withoutAnimation: false
    }
  },
  mutations: {
    TOGGLE_SIDEBAR: (state) => {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation: boolean) => {
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device: string) => {
      state.device = device
    },
    SET_SIZE: (state, size: string) => {
      state.size = size
    }
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }, withoutAnimation: boolean) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({ commit }, device: string) {
      commit('TOGGLE_DEVICE', device)
    },
    setSize({ commit }, size: string) {
      commit('SET_SIZE', size)
    }
  }
}

export default appModule
