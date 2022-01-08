const express = require('express')
const router = express.Router()
const adCtrl = require('../../controller/web/ad')

router.get('/', adCtrl.getAdList)


module.exports = router