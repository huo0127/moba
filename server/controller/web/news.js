const Category = require('../../models/Category')
const Article = require('../../models/Article')


exports.getNewsList = async (req, res, next) => {
  try {
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

    res.status(200).json({
      success: true,
      data: {
        data: cats
      }
    })

  } catch (err) {
    next(err)
  }
}

exports.getNews = async (req, res, next) => {
  try {
    const news = await Article.findById(req.params.id).lean()

    res.status(200).json({
      success: true,
      data: {
        data: news
      }
    })

  } catch (err) {
    next(err)
  }
}


exports.getHotList = async (req, res, next) => {
  try {
    const hotList = await Article.find().sort({ 'createdAt': -1 }).where({ categories: '5e96ad076ca45218e8000fc0' }).limit(5)

    res.status(200).json({
      success: true,
      data: {
        data: hotList
      }
    })

  } catch (err) {
    next(err)
  }
}

exports.initNews = async (req, res, next) => {
  try {
    const parent = await Category.findOne({
      name: '新聞資訊',
    })
    const cats = await Category.find()
      .where({
        parent: parent,
      })
      .lean()
    const newsTitles = [
      '《奧術》11/12~12/01 登入就送免費獎勵 !',
      '潛谷尋影，每格皆有機會中大獎！',
      '議會檔案館-入門介紹',
      '探索《奧術》活動問與答（大廳已於客戶端內上線）',
      '冬夜驚喜蛋，自選造型&精靈蛋大優惠！',
      '龍之恩賜，守護大地！',
      '10/09 系統維護 (已完成)',
      '09/02 系統維護 (已完成)',
      '07/01 系統維護 (已完成)',
      '05/27 系統緊急維護 (已完成)',
      '04/08 系統維護 (已完成)',
      '03/11 系統維護',
      '11/04《英雄聯盟》11.22 版本更新 (已完成)',
      '10/21《英雄聯盟》11.21 版本更新 (已完成)',
      '10/07《英雄聯盟》11.20 版本更新 (已完成)',
      '09/23《英雄聯盟》11.19 版本更新 (已完成)',
      '09/14《英雄聯盟》11.18 版本更新 (已完成)',
      '08/26《英雄聯盟》11.17 版本更新 (已更新)',
      '外媒透露：Nisqy直播中稱可能不參加2022年比賽',
      'Perkz離開C9戰隊',
      'G2戰隊老闆：嘗試降價租借Rekkles',
      '物理致命剎雅登頂下路',
      'LEC記者：Rekkles沒有加入任何一支LEC隊伍',
      '外媒爆料：T1下路選手Teddy準備轉會',
      'DoubleLift講述自己和TSM CEO意見不合 蛇蛇曾多次希望與他組下路',
      'G2打野Jankos自稱LPL友人，LPL緊急為他頒獎：LPL奪冠有你一份功勞！',
      '外媒爆料：G2 C9涉嫌干涉Perkz加盟FNC 官方調查后兩隊免于懲罰',
      'Doublelift直播控訴Reginald：他把很多選手罵到哭',
      'Perkz與G2老闆互動',
      'TL下路選手Tactical將轉會TSM擔任首發AD',
    ]
    const newsList = newsTitles.map(title => {
      const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)
      return {
        categories: randomCats.slice(0, 2),
        title: title,
      }
    })
    await Article.deleteMany({})
    await Article.insertMany(newsList)
    res.send(newsList)
  } catch (err) {
    next(err)
  }
}