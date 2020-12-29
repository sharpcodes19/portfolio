require ('dotenv').config ()

const express   = require ('express')
const bp        = require ('body-parser')
const cors      = require ('cors')
const ip        = require ('request-ip')
const ua        = require ('express-useragent')
const mongoose  = require ('mongoose')
const moment    = require ('moment')

// routers
const Account       = require ('./routers/Account')
const Transaction   = require ('./routers/Transaction')

const port = process.env.PORT || 9000
const app = express ()

app.use (bp.json ())
app.use (bp.urlencoded ({ extended: false }))
app.use (ip.mw ())
app.use (ua.express ())
app.use (cors ())

app.use ('/a', Account)
app.use ('/t', Transaction)
app.use (express.static ('public'));

app.listen (port, async () => {
  console.log (`${ moment ().format (process.env.DTF) } Server established at port ${ port }`)

  const url = 'mongodb://localhost:27017/net-pay'
  await mongoose.connect (url, {
    useCreateIndex:       true,
    useUnifiedTopology:   true,
    useNewUrlParser:      true,
    useFindAndModify:     false
  })
  console.log (`${ moment ().format (process.env.DTF) } Connected to MongoDb:`, url)
})