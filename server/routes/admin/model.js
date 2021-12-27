const express = require('express')

const modelCtrl = require('../../controller/admin/model')

const modelValidator = require('../../validator/admin/model')

const router = express.Router()

router.post('/', modelCtrl.createModel)

router.put('/:id', modelCtrl.updateModel)

router.delete('/:id', modelValidator.deleteModel, modelCtrl.deleteModel)

router.get('/:id', modelCtrl.getModel)

router.get('/', modelCtrl.getModels)

module.exports = router