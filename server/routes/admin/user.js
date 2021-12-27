const express = require('express')
const router = express.Router()
const userCtrl = require('../../controller/admin/user')

const userValidator = require('../../validator/admin/user')

router.post('/register', userValidator.register, userCtrl.register)
router.post('/login', userValidator.login, userCtrl.login)

module.exports = router