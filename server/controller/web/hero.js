const Category = require('../../models/Category')
const Hero = require('../../models/Hero')

exports.getHeroList = async (req, res, next) => {
  try {
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

exports.getHero = async (req, res, next) => {
  try {
    const hero = await Hero.findById(req.params.id).populate('categories startItems items shoes counters.hero spells primary_rune secondary_rune little_rune').lean()

    res.status(200).json({
      success: true,
      data: {
        data: hero
      }
    })

  } catch (err) {
    next(err)
  }
}