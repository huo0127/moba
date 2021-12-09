import { request } from '../utils/request'

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
