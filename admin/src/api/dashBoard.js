// import http from '../http'
import request from '@/utils/request'

export function totalCount (data) {
  return request({
    url: '/total',
    data
  })
}

export function hero_lane (data) {
  return request({
    url: '/hero_lane',
    data
  })
}
