import http from '../http'

// 新建
export function createCate (data) {
  return http({
    url: '/rest/categories',
    method: 'post',
    data
  })
}

// 查詢
export function getCate (cateId) {
  return http({
    url: `/rest/categories/${cateId}`
  })
}

// 編輯
export function updateCate (cateId, data) {
  return http({
    url: `/rest/categories/${cateId}`,
    method: 'put',
    data
  })
}

// 刪除
export function deleteCate (cateId) {
  return http({
    url: `/rest/categories/${cateId}`,
    method: 'delete'
  })
}


// 獲取列表
export function getCateList (params) {
  return http({
    url: `/rest/categories`,
    params
  })
}