import { request } from '../request'

// 英雄列表
export const getHeroList = () => {
  return request({
    url: '/heroes/list',
  })
}
