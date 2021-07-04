import { ElMessage } from 'element-plus'
import { IStateUser } from '#/store'
import { user_login, user_logout, get_user_info } from '@/api/user'
import { getToken, setToken, getRoles, setRoles, getName, setName, getAvatar, setAvatar } from '@/utils/auth'

const state: IStateUser = {
  token: getToken(),
  roles: getRoles(),
  name: getName(),
  avatar: getAvatar(),
  introduction: ''
}

const mutations = {
  SET_TOKEN: (state: IStateUser, token: string) => {
    state.token = token
    setToken(token)
  },
  SET_ROLES: (state: IStateUser, roles: string) => {
    state.roles = roles
    setRoles(roles)
  },
  SET_NAME: (state: IStateUser, name: string) => {
    state.name = name
    setName(name)
  },
  SET_AVATAR: (state: IStateUser, avatar: string) => {
    state.avatar = avatar
    setAvatar(avatar)
  },
  SET_INTRODUCTION: (state: IStateUser, introduction: string) => {
    state.introduction = introduction
  }
}

const actions = {
  // user login
  login({ commit }: any, userInfo: any) {
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
  logout({ commit, state, dispatch }: any) {
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
  getInfo({ commit, state }: any) {
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

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
