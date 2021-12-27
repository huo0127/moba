const validate = require('../../middleware/validate')
const assert = require('http-assert')

// 刪除
exports.deleteModel = [
  validate([
    validate.isValidObjectId(['params'], 'id')
  ]),
  // 較驗 model 是否存在
  async (req, res, next) => {
    const modelId = req.params.id
    const model = await req.Model.findById(modelId)
    req.model = model

    assert(model, 404, '此資料不存在')

    next()
  },

]
