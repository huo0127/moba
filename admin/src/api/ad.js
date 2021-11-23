import request from '@/utils/request'

// 新建
export function createAd (data) {
  return request({
    url: '/rest/ads',
    method: 'post',
    data
  })
}

// 編輯
export function updateAd (itemId, data) {
  return request({
    url: `/rest/ads/${itemId}`,
    method: 'put',
    data
  })
}

// 刪除
export function deleteAd (itemId) {
  return request({
    url: `/rest/ads/${itemId}`,
    method: 'delete'
  })
}


// 列表
export function getAdList (params) {
  return request({
    url: `/rest/ads`,
    params
  })
}
