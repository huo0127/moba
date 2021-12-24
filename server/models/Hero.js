const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  avatar: { type: String },
  banner: { type: String },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],

  skills: [{
    icon: { type: String },
    name: { type: String },
    keyName: { type: String },
    skillOrder: { type: Number },
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
  }],

  spells: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Spell' }],

  primary_rune: {
    rune: { type: mongoose.SchemaTypes.ObjectId, ref: 'Rune' },
    rune_first: { type: mongoose.SchemaTypes.ObjectId, ref: 'Rune' },
    rune_second: { type: mongoose.SchemaTypes.ObjectId, ref: 'Rune' },
    rune_third: { type: mongoose.SchemaTypes.ObjectId, ref: 'Rune' },
    rune_fourth: { type: mongoose.SchemaTypes.ObjectId, ref: 'Rune' }
  },

  secondary_rune: {
    rune: { type: mongoose.SchemaTypes.ObjectId, ref: 'Rune' },
    rune_first: { type: mongoose.SchemaTypes.ObjectId, ref: 'Rune' },
    rune_second: { type: mongoose.SchemaTypes.ObjectId, ref: 'Rune' },
  },

  little_rune: {
    rune_first: { type: mongoose.SchemaTypes.ObjectId, ref: 'Rune' },
    rune_second: { type: mongoose.SchemaTypes.ObjectId, ref: 'Rune' },
    rune_third: { type: mongoose.SchemaTypes.ObjectId, ref: 'Rune' },
  },



})

module.exports = mongoose.model('Hero', schema, 'heroes')