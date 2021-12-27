const validate = require('../../middleware/validate')
const assert = require('http-assert')
const { body } = require('express-validator')

const Category = require('../../models/Category')

exports.getCategory = validate([
  validate.isValidObjectId(['params'], 'id')
])

exports.deleteCategory = [
  validate([
    validate.isValidObjectId(['params'], 'id')
  ]),
  async (req, res, next) => {
    const categoryId = req.params.id
    const category = await Category.findById(categoryId)

    assert(category, 404, '此分類不存在')
    next()
  },

  // 禁止刪除有子分類的父分類
  async (req, res, next) => {
    const parent = await Category.findById(req.params.id)
    const child = await Category.aggregate([
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
    assert(child.length < 1, 403, '無法删除包含子分類的父级分類')
    next()
  },
]

exports.createCategory = [
  validate([body('name').notEmpty().withMessage('分類名稱必須填寫')]
  ),

  async (req, res, next) => {
    const { name } = req.body

    const category = await Category.findOne({ name })
    // 如果存在
    assert(!category, 409, '系統已有相同的數據')
    next()
  },
]

exports.updateCategory = [
  validate([
    validate.isValidObjectId(['params'], 'id')
  ]),
  // 較驗是否存在
  async (req, res, next) => {
    const id = req.params.id
    const category = await Category.findById(id)

    assert(category, 404, '此分類不存在')
    next()
  },
]