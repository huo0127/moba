const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  spells: [{

    heroId: { type: String },
    spellKey: { type: String },
    name: { type: String },
    description: { type: String },
    abilityIconPath: { type: String },
    abilityVideoPath: { type: String },
    dynamicDescription: { type: String },
    cost: [{ type: String }],
    cooldown: [{ type: String }],
    costburn: { type: String },
    cooldownburn: { type: String },
    range: { type: String },
  }]

})

module.exports = mongoose.model('Skill', schema)
