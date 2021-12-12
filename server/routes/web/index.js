module.exports = app => {
  const router = require('express').Router()
  const mongoose = require('mongoose')
  // const Article = require('../../models/Article')
  const Category = mongoose.model('Category')
  const Article = mongoose.model('Article')
  const Hero = mongoose.model('Hero')
  const Ad = mongoose.model('Ad')

  // 新聞列表
  router.get('/news/list', async (req, res) => {
    const parent = await Category.findOne({
      name: '新聞資訊',
    })
    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      {
        $lookup: {
          from: 'articles',
          localField: '_id',
          foreignField: 'categories',
          as: 'newsList',
        },
      },
    ])

    const subCats = cats.map(v => v._id)
    cats.unshift({
      name: '熱門',
      newsList: await Article.find()
        .where({
          categories: { $in: subCats },
        })
        .populate('categories')
        .limit(10)
        .lean(),
    })

    cats.map(cat => {
      cat.newsList.map(news => {
        news.categoryName = cat.name === '熱門' ? news.categories[0].name : cat.name
        return news
      })
      return cat
    })
    res.send(cats)
  })

  // 英雄列表接口
  router.get('/heroes/list', async (req, res) => {
    const parent = await Category.findOne({
      name: '英雄分類',
    })
    const cats = await Category.aggregate([
      // 條件查詢，像是where，但速度較快
      { $match: { parent: parent._id } },
      {
        // 關聯查詢
        $lookup: {
          // 要去model去指定heroes
          from: 'heroes',
          localField: '_id',
          foreignField: 'categories',
          as: 'heroList',
        },
      },
    ])

    res.send(cats)
  })

  // 文章详情
  router.get('/articles/:id', async (req, res) => {
    const data = await Article.findById(req.params.id).lean()
    res.send(data)
  })

  // 英雄詳情
  router.get('/heroes/:id', async (req, res) => {
    const data = await Hero.findById(req.params.id).populate('categories startItems items shoes counters.hero spells primary_rune.rune primary_rune.rune_first primary_rune.rune_fourth primary_rune.rune_second primary_rune.rune_third secondary_rune.rune secondary_rune.rune_first secondary_rune.rune_second little_rune.rune_first little_rune.rune_second little_rune.rune_third').lean()
    res.send(data)
  })

  // 輪播圖
  router.get('/ads', async (req, res) => {
    const model = await Ad.find()
    res.send(model)
  })

  // 首頁活動
  router.get('/news/event', async (req, res) => {
    const data = await Article.find().sort({ 'createdAt': -1 }).where({ categories: '5e96ad076ca45218e8000fc0' }).limit(5)
    res.send(data)
  })


  app.use('/web/api', router)
}
