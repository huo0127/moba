const Rune = require('../../models/Rune')


exports.getPrimaryRunes = async (req, res, next) => {
  try {
    // ID < 6000 是小符文
    const runes = await (await Rune.find({ styleName: '' })).filter(rune => Number(rune.ID) > 6000)

    res.status(200).json({ success: true, data: { data: runes } })
  } catch (err) {
    next()
  }
}

exports.getRelatedRunes = async (req, res, next) => {
  try {
    const runeId = await Rune.findById(req.params.id)
    const runeName = runeId.name
    const runes = await Rune.find({ styleName: runeName })

    res.status(200).json({ success: true, data: { data: runes } })
  } catch (err) {
    next(err)
  }
}

exports.getSecondaryRunes = async (req, res, next) => {
  try {
    const runeData = await Rune.findById(req.params.id)
    let runes = await (await Rune.find({ styleName: '' })).filter(rune => Number(rune.ID) > 6000 && rune.name !== runeData.name)

    res.status(200).json({ success: true, data: { data: runes } })
  } catch (err) {
    next()
  }
}


exports.getRelatedSecondaryRunes = async (req, res, next) => {
  try {
    const runeId = await Rune.findById(req.params.id)
    const runeName = runeId.name
    let runes = await Rune.find({ styleName: runeName })
    let result = runes.filter(rune => rune.slotLabel !== '基石')

    res.status(200).json({ success: true, data: { data: result } })
  } catch (err) {
    next(err)
  }
}

exports.getLittleRunes = async (req, res, next) => {
  try {
    const runes = await (await Rune.find({ styleName: '' })).filter(rune => Number(rune.ID) === 5007 || Number(rune.ID) === 5005 || Number(rune.ID) === 5008)

    res.status(200).json({ success: true, data: { data: runes } })
  } catch (err) {
    next(err)
  }
}

exports.getRelatedLittleRunes = async (req, res, next) => {
  try {
    const runes = await (await Rune.find({ styleName: '' })).filter(rune => Number(rune.ID) === 5008 || Number(rune.ID) === 5002 || Number(rune.ID) === 5003 || Number(rune.ID) === 5001)

    res.status(200).json({ success: true, data: { data: runes } })
  } catch (err) {
    next(err)
  }
}