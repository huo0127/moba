module.exports = options => {
  const assert = require('http-assert')
  const jwt = require('jsonwebtoken')
  const { jwtSecret } = require('../config/config.default')
  const AdminUser = require('../models/AdminUser')

  return async (req, res, next) => {
    const token = String(req.headers.authorization || '').split(' ').pop()

    assert(token, 401, '請先登入')
    // 驗證
    const { id } = jwt.verify(token, jwtSecret)
    assert(id, 401, '請先登入')
    // req.user = await AdminUser.findById(id)
    req.user = await AdminUser.findById(id)
    assert(req.user, 401, '請先登入')
    await next()
  }
}