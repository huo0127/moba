import http from '../http'

// 新建
export function createUser (data) {
  return http({
    url: '/rest/admin_user',
    method: 'post',
    data
  })
}



// 編輯
export function updateUser (itemId, data) {
  return http({
    url: `/rest/admin_user/${itemId}`,
    method: 'put',
    data
  })
}

// 刪除
export function deleteUser (itemId) {
  return http({
    url: `/rest/admin_user/${itemId}`,
    method: 'delete'
  })
}


// 列表
export function getUserList (params) {
  return http({
    url: `/rest/admin_user`,
    params
  })
}