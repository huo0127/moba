import http from '../http'

// 新建英雄
export function createHero (data) {
  return http({
    url: '/rest/heroes',
    method: 'post',
    data
  })
}

// 查詢英雄
export function getHero (heroId) {
  return http({
    url: `/rest/heroes/${heroId}`,
  })
}

// 編輯英雄
export function updateHero (heroId, data) {
  return http({
    url: `/rest/heroes/${heroId}`,
    method: 'put',
    data
  })
}

// 刪除英雄
export function deleteHero (heroId) {
  return http({
    url: `/rest/heroes/${heroId}`,
    method: 'delete'
  })
}

// 獲取英雄列表
export function getHeroList (params) {
  return http({
    url: 'rest/heroes',
    methods: 'get',
    params
  })
}
