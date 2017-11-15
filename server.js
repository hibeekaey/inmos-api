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
const app = express()

// app session
const session = require('./lib/session')(app)

// require routes
const routes = require('./routes')

// use routes
routes.mount(app)

// listen to the app on port process.env.PORT
app.listen(process.env.PORT, () => console.log(`Inmos API listening on port ${process.env.PORT}`))