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


// 英雄獲取主符文列表
export function get_primary_rune (params) {
  return request({
    url: 'primary_runes',
    params
  })
}

// 英雄獲取相關符文符文列表
export function get_related_rune (runeId, data) {
  return request({
    url: `related_runes/${runeId}`,
    data
  })
}

// 英雄獲取相關符文符文列表
export function get_secondary_rune (runeId, data) {
  return request({
    url: `secondary_runes/${runeId}`,
    data
  })
}

// 英雄獲取副符文相關符文列表
export function get_related_second_rune (runeId, data) {
  return request({
    url: `related_secondary_runes/${runeId}`,
    data
  })
}

// 英雄獲取小符文相關符文列表
export function get_little_rune (data) {
  return request({
    url: 'little_runes',
    data
  })
}

// 英雄獲取小符文相關符文列表
export function get_related_little_rune (data) {
  return request({
    url: 'related_little_runes',
    data
  })
}
