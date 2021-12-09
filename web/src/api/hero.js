import { request } from '../utils/request'

// 英雄列表
export const getHeroList = () => {
  return request({
    url: '/heroes/list',
  })
}

// 英雄詳情
export const getHero = (id) => {
  return request({
    url: `/heroes/${id}`,
  })
}