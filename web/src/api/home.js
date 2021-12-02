import { request } from './request'

// 新聞列表
export const getNewsList = () => {
  return request({
    url: '/news/list',
  })
}

// 文章詳情
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

// 英雄詳情
export const getHero = (id) => {
  return request({
    url: `/heroes/${id}`,
  })
}


// 輪播圖
export const getAds = () => {
  return request({
    url: '/ads',
  })
}
