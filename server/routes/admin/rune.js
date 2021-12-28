const express = require('express')
const router = express.Router()
const runeCtrl = require('../../controller/admin/rune')

router.get('/primary_runes', runeCtrl.getPrimaryRunes)

router.get('/little_runes', runeCtrl.getLittleRunes)

router.get('/related_little_runes', runeCtrl.getRelatedLittleRunes)

router.get('/secondary_runes/:id', runeCtrl.getSecondaryRunes)

router.get('/related_runes/:id', runeCtrl.getRelatedRunes)

router.get('/related_secondary_runes/:id', runeCtrl.getRelatedSecondaryRunes)


module.exports = router