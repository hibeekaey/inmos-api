/*!
 * inmos-api
 * Copyright (c) 2020 Sulihat
 * MIT Licensed
 */

'use strict'

/**
 * Module dependencies.
 */

const express = require('express')
const bodyParser = require('body-parser')
// const Cookies = require('cookies')
const cookieParser = require('cookie-parser')
// const Keygrip = require('keygrip')
// const cors = require('cors')

// initialize app
const app = express()

const cors = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://inmos-web.herokuapp.com')
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT')
  res.header('Access-Control-Max-Age', '3600')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Range')
  res.header('Access-Control-Expose-Headers', 'Accept-Ranges, Content-Encoding, Content-Length, Content-Range')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
}

// enable CORS
app.use(cors)

app.options('*', (req, res) => {
  res.send(201)
})

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// app session
// require('./lib/session')(app)

// cookies support as a connect middleware layer
// let keys = Keygrip([process.env.COOKIE_KEY1, process.env.COOKIE_KEY2])

// app.use(Cookies.express(keys))
app.use(cookieParser())

// require routes
const routes = require('./routes')

// use routes
routes.mount(app)

// listen to the app on port process.env.PORT
// eslint-disable-next-line no-console
app.listen(process.env.PORT || 5000, () => console.log(`Inmos API listening on port ${process.env.PORT || 5000}`))
