import { myAxios } from '../utils/request'

// 新聞列表
export const getNewsList = () => {
  return myAxios({
    url: '/news/list',
  })
}

// 文章詳情
export const getArticle = (id) => {
  return myAxios({
    url: `/articles/${id}`,
  })
}
