const express = require('express')
const router = express.Router()
const totalCtrl = require('../../controller/admin/total.js')

router.get('/dataTotal', totalCtrl.getDataTotal)

router.get('/heroLane', totalCtrl.getHeroLaneTotal)


module.exports = router