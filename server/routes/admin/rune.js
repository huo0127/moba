const express = require('express')
const router = express.Router()
const runeCtrl = require('../../controller/admin/rune')

router.get('/primary_runes', runeCtrl.getPrimaryRunes)

router.get('/secondary_runes/:id', runeCtrl.getSecondaryRunes)

router.get('/related_runes/:id', runeCtrl.getRelatedRunes)

router.get('/related_secondary_runes/:id', runeCtrl.getRelatedSecondaryRunes)

router.get('/little_first_runes', runeCtrl.getLittelFirstRunes)

router.get('/little_second_runes', runeCtrl.getLittleSecondRunes)

router.get('/little_third_runes', runeCtrl.getLittleThirdRunes)


module.exports = router