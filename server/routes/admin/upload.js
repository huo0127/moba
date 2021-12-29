const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: __dirname + '/../../uploads' })
const uploadCtrl = require('../../controller/admin/upload')

router.post('/upload', upload.single('file'), uploadCtrl.upload)


// 上傳阿里雲
// const multer = require('multer')
// const MAO = require('multer-aliyun-oss')
// const upload = multer({
// dest: __dirname + '/../../uploads',
//   storage: MAO({
//     config: {
//       region: 'oss-cn-hongkong',
//       accessKeyId: 'LTAI5tLuZAsekz93dpNX7PTD',
//       accessKeySecret: 'Oc6VbuGz9IbHnTTTehcO2ehXGJJQFq',
//       bucket: 'vue-lol',
//     },
//   }),
// })
// app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
//   const file = req.file
//   // file.url = `http://test.huo0127.com/uploads/${file.filename}`
//   res.send(file)
// })


module.exports = router