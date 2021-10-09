import { Module } from 'vuex'
import { TagsView } from '#/store'

interface View {
  name?: string
  path: string
  meta: {
    title?: string
    noCache?: boolean
  }
}

const tagsViewModule: Module<TagsView, any> = {
  namespaced: true,
  state: {
    visitedViews: [],
    cachedViews: []
  },
  mutations: {
    ADD_VISITED_VIEW: (state, view: View) => {
      if (state.visitedViews.some((v: { path: any }) => v.path === view.path)) return
      state.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta.title || 'no-name'
        })
      )
    },
    ADD_CACHED_VIEW: (state, view: View) => {
      if (state.cachedViews.includes(view.name)) return
      if (!view.meta.noCache) {
        state.cachedViews.push(view.name)
      }
    },

    DEL_VISITED_VIEW: (state, view: View) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1)
          break
        }
      }
    },
    DEL_CACHED_VIEW: (state, view: View) => {
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i)
          state.cachedViews.splice(index, 1)
          break
        }
      }
    },

    DEL_OTHERS_VISITED_VIEWS: (state, view: View) => {
      state.visitedViews = state.visitedViews.filter((v: { meta: { affix: any }; path: any }) => {
        return v.meta.affix || v.path === view.path
      })
    },
    DEL_OTHERS_CACHED_VIEWS: (state: { cachedViews: string | any[] }, view: View) => {
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i)
          state.cachedViews = state.cachedViews.slice(index, index + 1)
          break
        }
      }
    },

    DEL_ALL_VISITED_VIEWS: (state) => {
      // keep affix tags
      const affixTags = state.visitedViews.filter((tag: { meta: { affix: any } }) => tag.meta.affix)
      state.visitedViews = affixTags
    },
    DEL_ALL_CACHED_VIEWS: (state) => {
      state.cachedViews = []
    },

    UPDATE_VISITED_VIEW: (state, view: View) => {
      for (let v of state.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view)
          break
        }
      }
    }
  },
  actions: {
    addView({ dispatch }, view: View) {
      dispatch('addVisitedView', view)
      dispatch('addCachedView', view)
    },
    addVisitedView({ commit }, view: View) {
      commit('ADD_VISITED_VIEW', view)
    },
    addCachedView({ commit }, view: View) {
      commit('ADD_CACHED_VIEW', view)
    },

    delView({ dispatch, state }, view: View) {
      return new Promise((resolve) => {
        dispatch('delVisitedView', view)
        dispatch('delCachedView', view)
        resolve({
          visitedViews: [...state.visitedViews],
          cachedViews: [...state.cachedViews]
        })
      })
    },
    delVisitedView({ commit, state }, view: View) {
      return new Promise((resolve) => {
        commit('DEL_VISITED_VIEW', view)
        resolve([...state.visitedViews])
      })
    },
    delCachedView({ commit, state }, view: View) {
      return new Promise((resolve) => {
        commit('DEL_CACHED_VIEW', view)
        resolve([...state.cachedViews])
      })
    },

    delOthersViews({ dispatch, state }, view: View) {
      return new Promise((resolve) => {
        dispatch('delOthersVisitedViews', view)
        dispatch('delOthersCachedViews', view)
        resolve({
          visitedViews: [...state.visitedViews],
          cachedViews: [...state.cachedViews]
        })
      })
    },
    delOthersVisitedViews({ commit, state }, view: View) {
      return new Promise((resolve) => {
        commit('DEL_OTHERS_VISITED_VIEWS', view)
        resolve([...state.visitedViews])
      })
    },
    delOthersCachedViews({ commit, state }, view: View) {
      return new Promise((resolve) => {
        commit('DEL_OTHERS_CACHED_VIEWS', view)
        resolve([...state.cachedViews])
      })
    },

    delAllViews({ dispatch, state }, view: View) {
      return new Promise((resolve) => {
        dispatch('delAllVisitedViews', view)
        dispatch('delAllCachedViews', view)
        resolve({
          visitedViews: [...state.visitedViews],
          cachedViews: [...state.cachedViews]
        })
      })
    },
    delAllVisitedViews({ commit, state }) {
      return new Promise((resolve) => {
        commit('DEL_ALL_VISITED_VIEWS')
        resolve([...state.visitedViews])
      })
    },
    delAllCachedViews({ commit, state }) {
      return new Promise((resolve) => {
        commit('DEL_ALL_CACHED_VIEWS')
        resolve([...state.cachedViews])
      })
    },

    updateVisitedView({ commit }, view: View) {
      commit('UPDATE_VISITED_VIEW', view)
    }
  }
}

export default tagsViewModule
