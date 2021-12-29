module.exports = app => {
  // 驗證中間件
  const authMiddleware = require('../../middleware/auth')
  // 資源中間件
  const resourceMiddleware = require('../../middleware/resource')
  // 把子路由掛載上去 (rest代表的是通用的接口；resource用来動態獲取接口地址，如category)
  // app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)
  app.use('/admin/api/rest/:resource', resourceMiddleware(), require('./model'))

  app.use('/admin/api/categories', authMiddleware(), require('./category'))

  app.use('/admin/api', require('./user'))

  app.use('/admin/api', authMiddleware(), require('./total'))

  app.use('/admin/api', authMiddleware(), require('./rune'))

  app.use('/admin/api', authMiddleware(), require('./upload'))

}

