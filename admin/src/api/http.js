import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Vue from 'vue'
import router from '../router'

// 創建axios實例
const http = axios.create({
  // baseURL: process.env.VUE_APP_API_URL || '/admin/api',
  baseURL: 'http://localhost:3000/admin/api',
  timeout: 5000, // 請求超過時間
})

// request攔截器
http.interceptors.request.use(
  function (config) {
    NProgress.start() //開啟進度條
    // Do something before request is sent
    if (localStorage.token) {
      config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return config
  },

)

// response攔截器
http.interceptors.response.use(
  res => {
    NProgress.done() //停止進度條
    return res
  },
  err => {
    NProgress.done() //停止進度條
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

export default http