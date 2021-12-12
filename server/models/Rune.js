const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  ID: { type: String, default: '' },
  name: { type: String, required: true },
  icon: { type: String, default: '' },
  key: { type: String, default: '' },
  tooltip: { type: String, default: '' },
  shortdesc: { type: String, default: '' },
  longdesc: { type: String, default: '' },
  slotLabel: { type: String, default: '' },
  styleName: { type: String, default: '' },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
})

module.exports = mongoose.model('Rune', schema)
