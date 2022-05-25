import axios from 'axios'
import { ElMessage } from 'element-plus'
import { getToken, clearUserInfo } from '@/utils/auth'

const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  timeout: 1000 * 10 // request timeout
})

// 发起请求之前的拦截器
service.interceptors.request.use(
  (config) => {
    // 如果有token 就携带tokon
    const token = getToken()

    if (token) {
      config.headers['Authorization'] = 'Bearer__' + token
    }

    return config
  },
  (error) => Promise.reject(error)
)

// 响应拦截器
service.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response && error.response.status === 401) {
      clearUserInfo()
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
