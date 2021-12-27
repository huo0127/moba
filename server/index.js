const express = require("express")
const morgan = require('morgan')
const cors = require('cors')
var errorhandler = require('./middleware/error-handler')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use('/', express.static(__dirname + '/web'))
app.use('/admin', express.static(__dirname + '/admin'))
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./plugins/db')(app)
require('./routes/admin')(app)
require('./routes/web')(app)

app.use(errorhandler())

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})