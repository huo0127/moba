const { dbUri } = require('../config/config.default')

module.exports = app => {
  const mongoose = require("mongoose")
  mongoose.connect(dbUri, {
    useNewUrlParser: true,
  })

  const db = mongoose.connection

  db.on('error', (err) => {
    console.log('MongoDB 數據庫連結失敗', err);
  })

  db.once('open', function () {
    console.log('MongoDB 數據庫連結成功');
  })

  require('require-all')(__dirname + '/../models')
}