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
  console.log('Accessing vendor endpoint')
  next()
})

// define the vendor list route
router.get('/', (req, res) => {
  res.send('Vendor list route')
})

// define the add vendor route
.put('/new', (req, res) => {
  res.send('Add vendor route')
})

// define the vendor route
.get('/:id', (req, res) => {
  res.send('Vendor route')
})

.put('/:id', (req, res) => { // define the edit vendor route
  res.send('Edit vendor route')
})

.delete('/:id', (req, res) => { // define the remove vendor route
  res.send('Remove vendor route')
})

module.exports = router