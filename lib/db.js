/* eslint-disable no-console */
/*!
 * inmos-api
 * Copyright (c) 2020 Sulihat
 * MIT Licensed
 */

'use strict'

/**
 * Module dependencies.
 */

const pg = require('pg')

// config for pooling and client options
let config = {
  connectionString: process.env.DATABASE_URL,
  idleTimeoutMillis: 30000
}

// initialize connection pool
let pool = new pg.Pool(config)

// client error
pool.on('error', (err) => {
  console.error(`Idle client error: ${err.message}\n${err.stack}`)

  process.exit(-1)
})

module.exports = {
  error: (res, err, message, code) => {
    // error handler
    console.error(`DB connection error: ${err.message}\n${err.stack}`)

    res.status(code || 500).json({'status': 'error', 'message': message})
  },
  query: (text, values, callback) => {
    // query handler
    console.log(`Executed query: ${text}`)

    return pool.query(text, values, callback)
  },
  connect: (callback) => pool.connect(callback) // client connection handler
}
