const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  icon: { type: String, default: '' },
  key: { type: String, default: '' },
  first_rune: [
    {
      id: { type: Number, required: true },
      name: { type: String, required: true },
      icon: { type: String, default: '' },
      key: { type: String, default: '' },
      longDesc: { type: String, default: '' },
      shortDesc: { type: String, default: '' },
    }
  ],
  second_rune: [
    {
      id: { type: Number, required: true },
      name: { type: String, required: true },
      icon: { type: String, default: '' },
      key: { type: String, default: '' },
      longDesc: { type: String, default: '' },
      shortDesc: { type: String, default: '' },
    }
  ],
  third_rune: [
    {
      id: { type: Number, required: true },
      name: { type: String, required: true },
      icon: { type: String, default: '' },
      key: { type: String, default: '' },
      longDesc: { type: String, default: '' },
      shortDesc: { type: String, default: '' },
    }
  ],
  fourth_rune: [
    {
      id: { type: Number, required: true },
      name: { type: String, required: true },
      icon: { type: String, default: '' },
      key: { type: String, default: '' },
      longDesc: { type: String, default: '' },
      shortDesc: { type: String, default: '' },
    }
  ]

})

module.exports = mongoose.model('Rune', schema)
