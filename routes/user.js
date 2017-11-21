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
  console.log('Accessing user endpoint')
  next()
})

// define the index route
router.get('/', (req, res) => {
  res.send('API for the Online Inventory Monitoring System')
})

// define the user authentication route
.post('/auth/login', (req, res) => {
  res.send('User authentication')
})

// define the user registration route
.post('/register', (req, res) => {
  res.send('User registration')
})

module.exports = router