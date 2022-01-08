const express = require('express')
const router = express.Router()
const newsCtrl = require('../../controller/web/news')

router.get('/list', newsCtrl.getNewsList)

router.get('/hot', newsCtrl.getHotList)

router.get('/:id', newsCtrl.getNews)

module.exports = router