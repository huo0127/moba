import http from '../http'

// 新建
export function createAd (data) {
  return http({
    url: '/rest/ads',
    method: 'post',
    data
  })
}

// 編輯
export function updateAd (itemId, data) {
  return http({
    url: `/rest/ads/${itemId}`,
    method: 'put',
    data
  })
}

// 刪除
export function deleteAd (itemId) {
  return http({
    url: `/rest/ads/${itemId}`,
    method: 'delete'
  })
}


// 列表
export function getAdList (params) {
  return http({
    url: `/rest/ads`,
    params
  })
}