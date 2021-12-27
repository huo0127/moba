module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const Ad = require('../../models/Ad')
  const Article = require('../../models/Article')
  const Category = require('../../models/Category')
  const Hero = require('../../models/Hero')
  const Item = require('../../models/Item')
  const Rune = require('../../models/Rune')

  const response = require('../../utils/response')

  // 驗證中間件
  const authMiddleware = require('../../middleware/auth')
  // 資源中間件
  const resourceMiddleware = require('../../middleware/resource')
  // 把子路由掛載上去 (rest代表的是通用的接口；resource用来動態獲取接口地址，如category)
  // app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)
  app.use('/admin/api/rest/:resource', resourceMiddleware(), require('./model'))

  app.use('/admin/api/categories', require('./category'))

  app.use('/admin/api', require('./user'))


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

  // vue count to 後台數據總數
  app.get('/admin/api/total', authMiddleware(), async (req, res) => {
    const ads = await Ad.find().countDocuments()
    const article = await Article.find().countDocuments()
    const category = await Category.find().countDocuments()
    const hero = await Hero.find().countDocuments()
    const item = await Item.find().countDocuments()
    const data = { ads, article, category, hero, item }
    response(res, 200, '獲取後臺數據成功', data)
  })

  // 英雄路線總數
  app.get('/admin/api/hero_lane', authMiddleware(), async (req, res) => {
    const top = await Hero.find().where({ categories: '618e8b526eb3165add934563' }).countDocuments()
    const jungle = await Hero.find().where({ categories: '618e8b6a6eb3165add934577' }).countDocuments()
    const mid = await Hero.find().where({ categories: '618e8b606eb3165add93456e' }).countDocuments()
    const bot = await Hero.find().where({ categories: '618e8b746eb3165add934580' }).countDocuments()
    const sup = await Hero.find().where({ categories: '618e8b7d6eb3165add934589' }).countDocuments()
    const data = [top, jungle, mid, bot, sup]
    response(res, 200, '獲取英雄路線成功', data)
  })

  // 英雄獲取主符文列表
  app.get('/admin/api/primary_runes', authMiddleware(), async (req, res) => {
    const data = await Rune.find().where({ styleName: '' })
    res.send(data)
  })

  // 英雄獲取相關符文列表
  app.get('/admin/api/related_runes/:id', authMiddleware(), async (req, res) => {
    const item = await Rune.findById(req.params.id)
    const runeName = item.name
    const data = await Rune.find({ styleName: runeName })
    res.send(data)
  })

}

