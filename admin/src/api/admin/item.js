import http from '../http'

// 新建物品
export function createItem (data) {
  return http({
    url: 'rest/items',
    method: 'post',
    data
  })
}

// 根據 id 查詢物品
export function getItem (itemId) {
  return http({
    url: `rest/items/${itemId}`
  })
}

// 根據 id 編輯物品
export function updateItem (itemId, data) {
  return http({
    url: `rest/items/${itemId}`,
    method: 'put',
    data
  })
}

// 根據 id 刪除物品
export function deleteItem (itemId) {
  return http({
    url: `rest/items/${itemId}`,
    method: 'delete'
  })
}


// 獲取物品分類列表
export function getItemList (params) {
  return http({
    url: `/rest/items`,
    params
  })
}