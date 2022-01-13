import axios from 'axios'

function myAxios (axiosConfig, customOptions) {

  const service = axios.create({
    // baseURL: 'http://101.201.199.139/web/api',
    baseURL: 'http://localhost:3000/web/api',
    timeout: 5000
  })

  let custom_options = Object.assign({
    reduct_data_format: true
  }, customOptions)

  service.interceptors.request.use(config => {
    return config
  }, error => {
    return Promise.reject(error)
  })

  service.interceptors.response.use(response => {
    return custom_options.reduct_data_format ? response.data : response
  }, error => {
    return Promise.reject(error)
  })

  return service(axiosConfig)
}

function twitchRequest (config) {

  const instance = axios.create({
    baseURL: 'https://api.twitch.tv/helix',
    timeout: 5000
  })

  instance.interceptors.request.use(config => {

    config.headers = {
      Authorization: 'Bearer szgy8jciya6xfyvs6849r8ijvmrh1i',
      'Client-ID': 'wamznbyf5jcxfjx42vknj6slk5i1bp'
    }

    return config
  }, err => {

  })

  instance.interceptors.response.use(res => {
    return res.data
  }, err => {

  })

  return service(axiosConfig)

}


export {
  myAxios,
  twitchRequest
}