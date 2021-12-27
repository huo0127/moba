import request from '@/utils/request'

// 新建
export function createCate (data) {
  return request({
    url: '/categories',
    method: 'post',
    data
  })
}

// 查詢
export function getCate (cateId) {
  return request({
    url: `/categories/${cateId}`
  })
}

// 編輯
export function updateCate (cateId, data) {
  return request({
    url: `/categories/${cateId}`,
    method: 'put',
    data
  })
}

// 刪除
export function deleteCate (cateId) {
  return request({
    url: `/categories/${cateId}`,
    method: 'delete'
  })
}


// 獲取列表
export function getCateList (params) {
  return request({
    url: `/categories`,
    params
  })
}
