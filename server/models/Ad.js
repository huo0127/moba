const mongoose = require('mongoose')
const baseModel = require('./base-model')

const schema = new mongoose.Schema({
  ...baseModel,
  name: { type: String },
  items: [{
    image: { type: String },
    url: { type: String },
  }]
})

module.exports = mongoose.model('Ad', schema)