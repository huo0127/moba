const express = require('express')
const router = express.Router()
const categoryCtrl = require('../../controller/admin/category')
const categoryValidator = require('../../validator/admin/category')

router.get('/', categoryCtrl.getCategories)

router.get('/:id', categoryValidator.getCategory, categoryCtrl.getCategory)

router.put('/:id', categoryValidator.updateCategory, categoryCtrl.updateCategory)

// router.post('/', categoryValidator.createCategory, categoryCtrl.createCategory)

router.post('/', categoryCtrl.createCategory)

router.delete('/:id', categoryValidator.deleteCategory, categoryCtrl.deleteCategory)

module.exports = router