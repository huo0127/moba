import http from '../http'

export function loginReq (data) {
  return http({
    url: 'login',
    method: 'post',
    data
  })
}
