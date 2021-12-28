const Ad = require('../../models/Ad')
const Article = require('../../models/Article')
const Category = require('../../models/Category')
const Hero = require('../../models/Hero')
const Item = require('../../models/Item')
const Rune = require('../../models/Rune')
const Spell = require('../../models/Spell')


exports.getDataTotal = async (req, res, next) => {
  try {
    const ad = await Ad.countDocuments()
    const article = await Article.countDocuments()
    const category = await Category.countDocuments()
    const hero = await Hero.countDocuments()
    const item = await Item.countDocuments()
    const rune = await Rune.countDocuments()
    const spell = await Spell.countDocuments()

    const total = { ad, article, category, hero, item, rune, spell }

    res.status(200).json({ success: true, data: { data: total } })
  } catch (err) {
    next(err)
  }
}

exports.getHeroLaneTotal = async (req, res, next) => {
  try {
    const top = await Hero.countDocuments({ categories: '618e8b526eb3165add934563' })
    const jungle = await Hero.countDocuments({ categories: '618e8b6a6eb3165add934577' })
    const mid = await Hero.countDocuments({ categories: '618e8b606eb3165add93456e' })
    const bot = await Hero.countDocuments({ categories: '618e8b746eb3165add934580' })
    const sup = await Hero.countDocuments({ categories: '618e8b7d6eb3165add934589' })

    const data = [top, jungle, mid, bot, sup]

    res.status(200).json({ success: true, data: { data } })

  } catch (err) {
    next(err)
  }
}