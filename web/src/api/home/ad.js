import { request } from '../request'

// 輪播圖
export const getAds = () => {
  return request({
    url: '/ads',
  })
}
