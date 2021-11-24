module.exports = app => {
  const express = require('express')
  const assert = require('http-assert')
  const jwt = require('jsonwebtoken')
  const Ad = require('../../models/Ad')
  const AdminUser = require('../../models/AdminUser')
  const Article = require('../../models/Article')
  const Category = require('../../models/Category')
  const Hero = require('../../models/Hero')
  const Item = require('../../models/Item')

  const response = require('../../utils/response')

  const router = express.Router({
    mergeParams: true,
  })

  // 驗證中間件
  const authMiddleware = require('../../middleware/auth')
  // 資源中間件
  const resourceMiddleware = require('../../middleware/resource')
  // 把子路由掛載上去 (rest代表的是通用的接口；resource用来動態獲取接口地址，如category)
  app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)
  // app.use('/admin/api/rest/:resource', resourceMiddleware(), router)

  // 创建资源
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)

    response(res, 200, '成功', model)
  })

  // 更新资源
  router.put('/:id', async (req, res) => {
    await req.Model.findByIdAndUpdate(req.params.id, req.body)

    response(res, 200, '編輯完成')
  })

  // 删除资源
  router.delete('/:id', async (req, res) => {
    // 禁止删除有子分類的父级分類
    if (req.Model.modelName === 'Category') {
      const parent = await req.Model.findById(req.params.id)

      const children = await req.Model.aggregate([
        { $match: { parent: parent._id } },
        {
          $lookup: {
            from: 'Category',
            localField: '_id',
            foreignField: 'categories',
            as: 'children',
          },
        },
      ])
      assert(children.length < 1, 403, '無法刪除')
    }

    await req.Model.findByIdAndDelete(req.params.id)


    response(res, 200, '刪除成功')
  })

  //获取列表
  router.get(
    '/',

    // 文章升序或降序 
    async (req, res, next) => {
      if (!(req.query.order || req.query.prop)) return next()
      const pagenum = Number(req.query.pagenum)
      const pagesize = Number(req.query.pagesize)
      const skipNum = (pagenum - 1) * pagesize
      const total = await req.Model.countDocuments()
      if (req.query.order == 'ascending') {
        data = await req.Model.find().sort({ 'createdAt': 1 }).skip(skipNum).limit(pagesize).populate('categories')
      } else {
        data = await req.Model.find().sort({ 'createdAt': -1 }).skip(skipNum).limit(pagesize).populate('categories')
      }

      response(res, 200, '成功', {
        total,
        data
      })
    },

    // 模糊查詢
    async (req, res, next) => {
      if (!(req.query.pagenum || req.query.pagesize)) return next()
      const pagenum = Number(req.query.pagenum)
      const pagesize = Number(req.query.pagesize)
      const skipNum = (pagenum - 1) * pagesize
      const total = await req.Model.countDocuments()

      let data
      // 有搜尋條件
      if (req.query.query) {
        data = await req.Model.find({ name: { $regex: `${req.query.query}` } }).skip(skipNum).limit(pagesize).populate('categories')
      } else {
        // 單純展示列表
        data = await req.Model.find().skip(skipNum).limit(pagesize).populate('categories')
      }
      response(res, 200, '成功', {
        total,
        data
      })
    },
    async (req, res) => {
      if (req.Model.modelName === 'Category') {
        const parents = await req.Model.find()
          .where({
            parent: null,
          })
          .lean()
        for (let i = 0; i < parents.length; i++) {
          parents[i].children = await req.Model.aggregate([
            { $match: { parent: parents[i]._id } },
            {
              $lookup: {
                from: 'Category',
                localField: '_id',
                foreignField: 'parent',
                as: 'children',
              },
            },
          ])
          const lenth = parents[i].children.length
          for (let j = 0; j < lenth; j++) {
            parents[i].children[j].children = await req.Model.aggregate([
              { $match: { parent: parents[i].children[j]._id } },
              {
                $lookup: {
                  from: 'Category',
                  localField: '_id',
                  foreignField: 'parent',
                  as: 'children',
                },
              },
            ])
          }
        }
        // return res.send(parents)
        return response(res, 200, '獲取分類成功', parents)
      }

      const queryOptions = {}

      if (req.Model.modelName === 'Article') {
        queryOptions.populate = 'categories'
      }

      if (req.Model.modelName === 'Hero') {
        if (req.query.query) {
          const model = await Hero.find()
          res.send(model)
        } else {
          const model = await req.Model.find().setOptions(queryOptions)
          return res.send(model)
        }
      }

      const model = await req.Model.find().setOptions(queryOptions)
      res.send(model)
    }
  )

  // 资源详情
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    // res.send(model)
    response(res, 200, '成功', model)
  })



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

  // 註冊
  app.post(
    '/admin/api/register',
    async (req, res) => {
      const { username, password } = req.body
      const isRepeat = await AdminUser.findOne({ username })
      assert(!isRepeat, 409, '用戶名已被註冊')
      await AdminUser.create({ username, password })
      response(res, 200, '用戶註冊成功')
    })

  // 登入
  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    // 1.根据用户名找用户
    const user = await AdminUser.findOne({ username }).select('+password')
    assert(user, 422, '用户名不存在')
    // 2.校验密码
    const isValid = require('bcrypt').compareSync(password, user.password)
    assert(isValid, 422, '密碼錯誤')
    // 3.返回token
    const token = jwt.sign(
      {
        id: String(user._id),
      },
      app.get('secret')
    )
    response(res, 200, 'success', { user, token })
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

  // 錯誤處理函數 處理assert
  app.use(async (err, req, res, next) => {
    console.log(err)
    res.status(err.statusCode || 500).send({
      message: err.message,
    })
  })
}

