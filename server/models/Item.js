const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  iconPath: { type: String, default: '' },
  description: { type: String, default: '' },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
})

module.exports = mongoose.model('Item', schema)
