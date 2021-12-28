const mongoose = require('mongoose')
const baseModel = require('./base-model')

const schema = new mongoose.Schema({
  ...baseModel,
  name: { type: String, required: true },
  iconPath: { type: String, default: '' },
  description: { type: String, default: '' },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
})

module.exports = mongoose.model('Item', schema)
