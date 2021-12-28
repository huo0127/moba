const mongoose = require('mongoose')
const baseModel = require('./base-model')

const schema = new mongoose.Schema({
  ...baseModel,
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  name: { type: String },
  body: { type: String },
  iconPath: { type: String, default: '' },
}, {
  timestamps: true
})

module.exports = mongoose.model('Article', schema)