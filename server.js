/*!
 * inmos-api
 * Copyright (c) 2017 Ibukun O. Dairo
 * MIT Licensed
 */

'use strict'

/**
 * Module dependencies.
 */

const express = require('express')
const bodyParser = require('body-parser')
const Cookies = require('cookies')
const Keygrip = require('keygrip')

// initialize app
const app = express()

// enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// app session
const session = require('./lib/session')(app)

// cookies support as a connect middleware layer
let keys = Keygrip([process.env.COOKIE_KEY1, process.env.COOKIE_KEY2])

app.use(Cookies.express(keys))

// require routes
const routes = require('./routes')

// use routes
routes.mount(app)

// listen to the app on port process.env.PORT
app.listen(process.env.PORT, () => console.log(`Inmos API listening on port ${process.env.PORT}`))
