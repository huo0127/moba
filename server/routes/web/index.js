module.exports = app => {
  const router = require('express').Router()
  const mongoose = require('mongoose')
  // const Article = require('../../models/Article')
  const Category = mongoose.model('Category')
  const Article = mongoose.model('Article')
  const Hero = mongoose.model('Hero')
  const Ad = mongoose.model('Ad')
  const Rune = mongoose.model('Rune')

  const response = require('../../utils/response')

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
    response(res, 200, '獲取英雄數據成功', {
      data
    })
  })

  // 根據英雄ID獲取相對應符文
  router.get('/runes', async (req, res) => {
    const { mainRuneId, runeFirstId, runeSecondId, runeThirdId, runeFourthId, SecondRuneId } = req.query

    const mainRuneName = await Rune.findById(mainRuneId)
    const firstRuneName = await Rune.findById(runeFirstId)
    const secondRuneName = await Rune.findById(runeSecondId)
    const thirdRuneName = await Rune.findById(runeThirdId)
    const fourthRuneName = await Rune.findById(runeFourthId)

    const item = await Rune.find().where({ slotLabel: firstRuneName.slotLabel })
    // 找出基石中與主符文相符合的名稱
    const firstRune = item.filter(rune => rune.styleName === mainRuneName.name)

    const secondRune = await Rune.find().where({ slotLabel: secondRuneName.slotLabel })
    const thirdRune = await Rune.find().where({ slotLabel: thirdRuneName.slotLabel })
    const fourthRune = await Rune.find().where({ slotLabel: fourthRuneName.slotLabel })

    // 副系   主宰 巫術 啟迪 精密
    // 第一層 預謀 寶物 巧具 英武
    // 第二層 追蹤 卓越 未來 傳說
    // 第三層 狩獵 威能 超越 戰鬥

    // 根據ID找出符雯文
    const secondaryRuneName = await Rune.findById(SecondRuneId)

    // 找出所有副系有關符文
    const data = await Rune.find({ styleName: secondaryRuneName.name })
    let secondary_firstRune = data.filter(rune => rune.slotLabel === '預謀' || rune.slotLabel === '寶物' || rune.slotLabel === '巧具' || rune.slotLabel === '英武')
    let secondary_secondRune = data.filter(rune => rune.slotLabel === '追蹤' || rune.slotLabel === '卓越' || rune.slotLabel === '未來' || rune.slotLabel === '傳說')
    let secondary_thirdRune = data.filter(rune => rune.slotLabel === '狩獵' || rune.slotLabel === '威能' || rune.slotLabel === '超越' || rune.slotLabel === '戰鬥')

    response(res, 200, '獲取對應符文成功', {
      firstRune,
      secondRune,
      thirdRune,
      fourthRune,
      secondary_firstRune,
      secondary_secondRune,
      secondary_thirdRune
    })
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
