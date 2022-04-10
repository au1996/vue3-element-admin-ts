import { Module } from 'vuex'
import { ElMessage } from 'element-plus'
import { User } from '#/store'
import { user_login, user_logout, get_user_info } from '@/api/user'
import {
  getToken,
  setToken,
  getRoles,
  setRoles,
  getName,
  setName,
  getAvatar,
  setAvatar
} from '@/utils/auth'

const userModule: Module<User, any> = {
  namespaced: true,
  state: {
    token: getToken(),
    roles: getRoles(),
    name: getName(),
    avatar: getAvatar(),
    introduction: ''
  },
  mutations: {
    SET_TOKEN: (state, token: string) => {
      state.token = token
      setToken(token)
    },
    SET_ROLES: (state, roles: string) => {
      state.roles = roles
      setRoles(roles)
    },
    SET_NAME: (state, name: string) => {
      state.name = name
      setName(name)
    },
    SET_AVATAR: (state, avatar: string) => {
      state.avatar = avatar
      setAvatar(avatar)
    },
    SET_INTRODUCTION: (state, introduction: string) => {
      state.introduction = introduction
    }
  },
  actions: {
    // user login
    login({ commit }, userInfo: any) {
      return new Promise((resolve, reject) => {
        user_login(userInfo)
          .then((res: any) => {
            console.log(11, res)
            if (res.token) {
              commit('SET_TOKEN', res.token)
              commit('SET_ROLES', res.role)
              commit('SET_NAME', res.username)
              commit('SET_AVATAR', res.avatar)
              commit('SET_INTRODUCTION', res.introduction)
              ElMessage({
                type: 'success',
                message: res.message
              })
            } else {
              ElMessage({
                type: 'error',
                message: res.message
              })
            }
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // user logout
    logout({ commit, state, dispatch }) {
      return new Promise((resolve, reject) => {
        user_logout(state.token)
          .then((res) => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', '')
            commit('SET_NAME', '')
            commit('SET_AVATAR', '')
            dispatch('tagsView/delAllViews', null, { root: true })

            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // get user info
    getInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        get_user_info(state.token)
          .then((res: any) => {
            if (!res) {
              reject('Verification failed, please Login again.')
            }

            const { roles, name, avatar, introduction } = res

            // roles must be a non-empty array
            if (!roles || roles.length <= 0) {
              reject('getInfo: roles must be a non-null array!')
            }

            commit('SET_NAME', name)
            commit('SET_ROLES', roles)
            commit('SET_AVATAR', avatar)
            commit('SET_INTRODUCTION', introduction)
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
  }
}

export default userModule
