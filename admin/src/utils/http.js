import axios from 'axios'
import Vue from 'vue'
import router from '@/router'

// 創建axios實例
const service = axios.create({
  // baseURL: process.env.VUE_APP_API_URL || '/admin/api',
  baseURL: 'http://localhost:3000/admin/api',
  timeout: 5000, // 請求超過時間
})

// request攔截器
service.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if (localStorage.token) {
      config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// response攔截器
service.interceptors.response.use(
  res => {
    return res
  },
  err => {
    if (err.response.data.message) {
      Vue.prototype.$message({
        type: 'error',
        message: err.response.data.message,
      })

      if (err.response.status === 401) {
        router.push('/login')
      }
    }

    return Promise.reject(err)
  }
)

export default service
