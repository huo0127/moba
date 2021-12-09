import request from '@/utils/request'

// 新建物品
export function createSpell (data) {
  return request({
    url: '/rest/spells',
    method: 'post',
    data
  })
}

// 根據 id 查詢物品
export function getSpell (spellId) {
  return request({
    url: `/rest/spells/${spellId}`
  })
}

// 根據 id 編輯物品
export function updateSpell (spellId, data) {
  return request({
    url: `/rest/spells/${spellId}`,
    method: 'put',
    data
  })
}

// 根據 id 刪除物品
export function deleteSpell (spellId) {
  return request({
    url: `/rest/spells/${spellId}`,
    method: 'delete'
  })
}


// 獲取物品分類列表
export function getSpellList (params) {
  return request({
    url: `/rest/spells`,
    params
  })
}
