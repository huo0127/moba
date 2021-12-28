module.exports = app => {
  const express = require('express')
  const router = express.Router()

  const response = require('../../utils/response')

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


  // 上傳阿里雲
  // const multer = require('multer')
  // const MAO = require('multer-aliyun-oss')
  // const upload = multer({
  // dest: __dirname + '/../../uploads',
  //   storage: MAO({
  //     config: {
  //       region: 'oss-cn-hongkong',
  //       accessKeyId: 'LTAI5tLuZAsekz93dpNX7PTD',
  //       accessKeySecret: 'Oc6VbuGz9IbHnTTTehcO2ehXGJJQFq',
  //       bucket: 'vue-lol',
  //     },
  //   }),
  // })
  // app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
  //   const file = req.file
  //   // file.url = `http://test.huo0127.com/uploads/${file.filename}`
  //   res.send(file)
  // })

  // 上傳本地
  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' })
  app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    response(res, 200, '上傳成功', file)
  })
}

