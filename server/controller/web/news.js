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

