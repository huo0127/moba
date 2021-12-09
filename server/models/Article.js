const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  name: { type: String },
  body: { type: String },
  iconPath: { type: String, default: '' },
}, {
  timestamps: true
})

module.exports = mongoose.model('Article', schema)