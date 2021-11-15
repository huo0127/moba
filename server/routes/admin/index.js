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

  const router = express.Router({
    mergeParams: true,
  })

  // 创建资源
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })

  // 更新资源
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  // 删除资源
  router.delete('/:id', async (req, res) => {
    // 禁止删除有子分类的父级分类
    if (req.Model.modelName === 'Category') {

      const parent = await req.Model.findById(req.params.id)

      const children = await req.Model.aggregate([
        { $match: { parent: parent._id } },
        {
          $lookup: {
            from: 'Category',
            localField: '_id',
            foreignField: 'cate',
            as: 'children'
          }
        }
      ])

      assert(children.length < 1, 403, '无法删除')
    }

    await req.Model.findByIdAndDelete(req.params.id)
    res.send({ message: '删除成功' })
  })

  // 资源列表
  router.get('/', async (req, res,) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      const parents = await req.Model.find().where({
        parent: null
      }).lean()
      for (let i = 0; i < parents.length; i++) {

        parents[i].children = await req.Model.aggregate([
          { $match: { parent: parents[i]._id } },
          {
            $lookup: {
              from: 'Category',
              localField: '_id',
              foreignField: 'parent',
              as: 'children'
            }
          }
        ])

        const lenth = parents[i].children.length

        for (let j = 0; j < lenth; j++) {
          // console.log((parents[i].children)[j]);

          (parents[i].children)[j].children = await req.Model.aggregate([
            { $match: { parent: (parents[i].children)[j]._id } },
            {
              $lookup: {
                from: 'Category',
                localField: '_id',
                foreignField: 'parent',
                as: 'children'
              }
            }
          ])
        }

      }

      return res.send(parents)


    }
    const items = await req.Model.find().setOptions(queryOptions).limit(200)
    res.send(items)
  })

  // 资源详情
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })



  // 登录校验中间件
  const authMiddleware = require('../../middleware/auth')
  const resourceMiddleware = require('../../middleware/resource')
  app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

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
    res.send(file)
  })

  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    // 1.根据用户名找用户
    const user = await AdminUser.findOne({ username }).select('+password')
    assert(user, 422, '用户不存在')
    // 2.校验密码
    const isValid = require('bcrypt').compareSync(password, user.password)
    assert(isValid, 422, '密码错误')
    // 3.返回token
    const token = jwt.sign({ id: user._id }, app.get('secret'))
    res.send({ token })
  })

  app.get('/admin/api/echarts', authMiddleware(), async (req, res) => {
    const ad = await Ad.find().countDocuments()
    const article = await Article.find().countDocuments()
    const category = await Category.find().countDocuments()
    const hero = await Hero.find().countDocuments()
    const item = await Item.find().countDocuments()
    res.send([ad, article, category, hero, item])
  })

  // 错误处理函数
  app.use(async (err, req, res, next) => {
    // console.log(err)
    res.status(err.statusCode || 500).send({
      message: err.message,
    })
  })
}
