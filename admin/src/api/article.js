import request from '@/utils/request'

// 新建物品
export function createArticle (data) {
  return request({
    url: '/rest/articles',
    method: 'post',
    data
  })
}

// 根據 id 查詢物品
export function getArticle (itemId) {
  return request({
    url: `/rest/articles/${itemId}`
  })
}

// 根據 id 編輯物品
export function updateArticle (itemId, data) {
  return request({
    url: `/rest/articles/${itemId}`,
    method: 'put',
    data
  })
}

// 根據 id 刪除物品
export function deleteArticle (itemId) {
  return request({
    url: `/rest/articles/${itemId}`,
    method: 'delete'
  })
}


// 獲取物品分類列表
export function getArticleList (params) {
  return request({
    url: '/rest/articles',
    params
  })
}


