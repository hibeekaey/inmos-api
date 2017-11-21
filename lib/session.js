/*!
 * inmos-api
 * Copyright (c) 2017 Ibukun O. Dairo
 * MIT Licensed
 */

'use strict'

/**
 * Module dependencies.
 */

const cookieSession = require('cookie-session')

// cookie expiration time
let expiryDate = 24 * 60 * 60 * 1000 // 24 hours

module.exports = (app) => {
  app.set('trust proxy', 1) // trust first proxy

  app.use(cookieSession({
    name: 'inmos',
    keys: [
      process.env.SESSION_KEY1,
      process.env.SESSION_KEY2
    ],
    secret: process.env.SESSION_SECRET,
    maxAge: expiryDate
  }))
}