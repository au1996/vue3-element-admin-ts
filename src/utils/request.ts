import axios from 'axios'
import { ElMessage } from 'element-plus'
import { getToken, removeToken, removeRoles, removeName, removeAvatar } from './auth'

const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000 // request timeout
})

// 发起请求之前的拦截器
service.interceptors.request.use(
  (config: any) => {
    // 如果有token 就携带tokon
    const token = getToken()
    if (token) {
      config.headers['Authorization'] = 'Bearer__' + token
    }
    return config
  },
  (error: any) => Promise.reject(error)
)

// 响应拦截器
service.interceptors.response.use(
  (response: any) => response.data,
  (error: any) => {
    if (error.response && error.response.status === 401) {
      removeToken()
      removeRoles()
      removeName()
      removeAvatar()
      location.reload()
    }
    ElMessage({
      type: 'error',
      message: error.message
    })
    return Promise.reject(error)
  }
)

export default service
