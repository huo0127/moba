import { myAxios } from '../utils/request'

// 英雄路線
export const getHeroLane = (params) => {
  return myAxios({
    url: '/heroes/lane',
    params
  })
}

// 英雄列表
export const getHeroList = (params) => {
  return myAxios({
    url: '/heroes/list',
    params
  })
}

// 英雄詳情
export const getHero = (id) => {
  return myAxios({
    url: `/heroes/${id}`,
  })
}