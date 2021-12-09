import request from '@/utils/request'

// 新建物品
export function createRune (data) {
  return request({
    url: '/rest/runes',
    method: 'post',
    data
  })
}

// 根據 id 查詢物品
export function getRune (runeId) {
  return request({
    url: `/rest/runes/${runeId}`
  })
}

// 根據 id 編輯物品
export function updateRune (runeId, data) {
  return request({
    url: `/rest/runes/${runeId}`,
    method: 'put',
    data
  })
}

// 根據 id 刪除物品
export function deleteRune (runeId) {
  return request({
    url: `/rest/runes/${runeId}`,
    method: 'delete'
  })
}


// 獲取物品分類列表
export function getRuneList (params) {
  return request({
    url: `/rest/runes`,
    params
  })
}
