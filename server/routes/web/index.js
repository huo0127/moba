module.exports = app => {


  app.use('/web/api/heroes', require('./hero'))
  app.use('/web/api/news', require('./news'))
  app.use('/web/api/ads', require('./ad'))

}
