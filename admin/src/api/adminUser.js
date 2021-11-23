import request from '@/utils/request'

// 新建
export function createUser (data) {
  return request({
    url: '/rest/admin_user',
    method: 'post',
    data
  })
}



// 編輯
export function updateUser (itemId, data) {
  return request({
    url: `/rest/admin_user/${itemId}`,
    method: 'put',
    data
  })
}

// 刪除
export function deleteUser (itemId) {
  return request({
    url: `/rest/admin_user/${itemId}`,
    method: 'delete'
  })
}


// 列表
export function getUserList (params) {
  return request({
    url: `/rest/admin_user`,
    params
  })
}

// 登入
export function login (data) {
  return request({
    url: "login",
    method: "post",
    data
  });
}

// 註冊
export function register (data) {
  return request({
    url: "register",
    method: "post",
    data
  });
}
