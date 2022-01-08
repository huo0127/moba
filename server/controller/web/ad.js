const Ad = require('../../models/Ad')
exports.getAdList = async (req, res, next) => {
  try {
    const ad = await Ad.find()
    res.status(200).json({
      success: true,
      data: {
        data: ad
      }
    })
  } catch (err) {
    next(err)
  }
}