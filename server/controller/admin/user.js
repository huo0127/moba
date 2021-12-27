const User = require('../../models/AdminUser')
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../../config/config.default')


exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body
    await User.create({ username, password })
    res.status(200).json({ success: true, msg: '註冊成功' })
  } catch (err) {
    next(err)
  }
}

exports.login = async (req, res, next) => {
  try {
    const user = req.user.toJSON()
    // 生成token
    const token = await jwt.sign({ id: String(user._id) }, jwtSecret, { expiresIn: "1d" })

    delete user.password
    res.status(200).json({ data: { ...user, token } })
  } catch (err) {
    next(err)
  }
}

