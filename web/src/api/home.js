import { request } from './request'

export const getNewsList = () => {
  return request({
    url: '/news/list',
  })
}

export const getArticle = (id) => {
  return request({
    url: `/articles/${id}`,
  })
}

// 英雄列表
export const getHeroList = () => {
  return request({
    url: '/heroes/list',
  })
}


// 輪播圖
export const getAds = () => {
  return request({
    url: '/ads',
  })
}
