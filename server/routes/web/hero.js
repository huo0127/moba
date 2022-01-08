const express = require('express')
const router = express.Router()
const heroCtrl = require('../../controller/web/hero')

router.get('/list', heroCtrl.getHeroList)

router.get('/:id', heroCtrl.getHero)


module.exports = router