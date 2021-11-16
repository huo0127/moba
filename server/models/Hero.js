const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  avatar: { type: String },
  banner: { type: String },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],

  skills: [{
    icon: { type: String },
    name: { type: String },
    delay: { type: String },
    cost: { type: String },
    range: { type: String },
    description: { type: String },
    video: { type: String },
  }],

  startItems: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  items: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  shoes: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],

  counters: [{
    hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
  }],

  skins: [{
    name: { type: String },
    img: { type: String, }
  }]
})

module.exports = mongoose.model('Hero', schema, 'heroes')