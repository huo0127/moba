const { body } = require('express-validator')
const assert = require('http-assert')
const validate = require('../../middleware/validate')
const User = require('../../models/AdminUser')

exports.register = [
  validate([
    body('username')
      .notEmpty().withMessage('使用者名稱必須填寫')
      .matches(/^[A-Za-z0-9_]+$/).withMessage('使用者名稱只能含有大小寫英文字母、數字與底線')
      .isLength({ min: 5, max: 12 }).withMessage('使用者名稱需 3 ~ 12 字元'),
    body('password')
      .notEmpty().withMessage('密碼必須填寫')
      .isLength({ min: 6, max: 20 }).withMessage('密碼長度需 6 ~ 20 字元')
      .matches(/^[A-Za-z0-9]+$/).withMessage('密碼只能含有大小寫英文字母與數字')
  ]
  ),

  // 校驗用戶是否存在
  async (req, res, next) => {
    const { username } = req.body
    const user = await User.findOne({ username })

    assert(!user, 409, '用戶名已被註冊')
    next()
  },
]

exports.login = [
  validate([
    body('username')
      .notEmpty().withMessage('使用者名稱必須填寫')
      .matches(/^[A-Za-z0-9_]+$/).withMessage('使用者名稱只能含有大小寫英文字母、數字與底線')
      .isLength({ min: 5, max: 12 }).withMessage('使用者名稱需 3 ~ 12 字元')
      .custom(async (username, { req }) => {
        const user = await User.findOne({ username }).select(['username', 'password'])

        if (!user) {
          return Promise.reject('使用者名稱不存在')
        }
        // 掛載到req身上供後面中間件使用
        req.user = user
      })
  ]),
  validate([
    body('password')
      .notEmpty().withMessage('密碼必須填寫')
      .isLength({ min: 6, max: 20 }).withMessage('密碼長度需 6 ~ 20 字元')
      .matches(/^[A-Za-z0-9]+$/).withMessage('密碼只能含有大小寫英文字母與數字')
      .custom(async (password, { req }) => {
        const isValid = require('bcrypt').compareSync(password, req.user.password)
        if (!isValid) {
          return Promise.reject('密碼不正確')
        }
      })
  ])
]