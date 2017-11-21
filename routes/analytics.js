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
const router = express.Router()

// user authentication lib
const auth = require('../lib/auth')

// access db lib
const db = require('../lib/db')

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Accessing analytics endpoint')
  next()
})

// define the analytics route
router.get('/', (req, res) => {
  res.send('Analytics route')
})

// define general analytics route
.get('/general', (req, res) => {
  res.send('General analytics route')
})

// define stock analytics route
.get('/stock', (req, res) => {
  res.send('Stock analytics route')
})


module.exports = router