
// 上傳本地
exports.upload = async (req, res, next) => {
  try {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.status(200).json({ success: true, data: { data: file } })
  } catch (err) {
    next(err)
  }
}