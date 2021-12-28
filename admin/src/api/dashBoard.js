import request from '@/utils/request'

export function totalCount (data) {
  return request({
    url: '/dataTotal',
    data
  })
}

export function hero_lane (data) {
  return request({
    url: '/heroLane',
    data
  })
}
