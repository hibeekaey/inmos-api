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

// initialize app
const app = express()

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// app session
const session = require('./lib/session')(app)

// require routes
const routes = require('./routes')

// use routes
routes.mount(app)

// listen to the app on port process.env.PORT
app.listen(process.env.PORT, () => console.log(`Inmos API listening on port ${process.env.PORT}`))