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
const authenticate = require('../lib/auth')

// access db lib
const db = require('../lib/db')

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Accessing analytics endpoint')
  
  next()
})

// authenticate user
router.use(authenticate)

// define the analytics route
router.get('/all', (req, res) => {
  res.send('All analytics route')
})
  .get('/general', (req, res) => {
  // define general analytics route

    res.send('General analytics route')
  })
  .get('/stock', (req, res) => {
  // define stock analytics route

    res.send('Stock analytics route')
  })

module.exports = router
