/*!
 * inmos-api
 * Copyright (c) 2017 Ibukun O. Dairo
 * MIT Licensed
 */

'use strict'

/**
 * Module dependencies.
 */

const user = require('./user')
const stock = require('./stock')
const vendor = require('./vendor')
const analytics = require('./analytics')

module.exports = {
  mount: (app) => {
    app.use('/', user)
    app.use('/stock', stock)
    app.use('/vendor', vendor)
    app.use('/analytics', analytics)
  }
}