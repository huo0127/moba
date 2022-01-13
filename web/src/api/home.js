import { myAxios } from '../utils/request'

// 輪播圖
export const getAds = () => {
  return myAxios({
    url: '/ads',
  })
}

// 活動列表
export const getEvents = () => {
  return myAxios({
    url: '/news/event',
  })
}
