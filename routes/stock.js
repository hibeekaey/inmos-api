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
  console.log('Accessing stock endpoint')
  next()
})

// define the stock route
router.get('/', (req, res) => {
  res.send('Stock route')
})

// define the add stock item route
.put('/new', (req, res) => {
  res.send('Add stock item route')
})

// define the stock item route
.get('/:id', (req, res) => {
  res.send('Stock item route')
})

.put('/:id', (req, res) => { // define the edit stock item route
  res.send('Edit stock item route')
})

.delete('/:id', (req, res) => { // define the remove stock item route
  res.send('Remove stock item route')
})

module.exports = router