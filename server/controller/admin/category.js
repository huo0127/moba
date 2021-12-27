const Category = require('../../models/Category')

exports.getCategories = async (req, res, next) => {
  try {
    const parents = await Category.find()
      .where({
        parent: null,
      })
      .lean()
    for (let i = 0; i < parents.length; i++) {
      parents[i].children = await Category.aggregate([
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
        parents[i].children[j].children = await Category.aggregate([
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
    res.status(200).json({ success: true, data: { data: parents } })
  } catch (err) {
    next(err)
  }
}

exports.getCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.articleId)
    res.status(200)
      .json({ success: true, data: { data: category } })
  } catch (err) {
    next(err)
  }
}

exports.deleteCategory = async (req, res, next) => {
  try {
    await Category.findByIdAndDelete(req.params.id)
    res.status(200).json({ success: true, msg: '刪除成功' })
  } catch (err) {
    next(err)
  }
}

exports.createCategory = async (req, res, next) => {
  try {
    const category = await Category.create(req.body)
    res.status(200).json({
      success: true,
      data: {
        data: category
      }
    })
  } catch (err) {
    next(err)
  }
}

exports.updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json({ success: true, data: { data: category } })
  } catch (err) {
    next(err)
  }
}