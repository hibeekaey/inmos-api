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
  console.log('Accessing stock endpoint')
  
  next()
})

// authenticate user
router.use(authenticate)

// define the inventory route
router.get('/all', (req, res) => {
  res.send('Inventory route')
})
  .put('/new', (req, res) => {
  // define the add stock route
  
    res.send('Add stock route')
  })
  .route('/:id')
  .get((req, res) => {
  // define the stock route

    res.send('Stock route')
  })
  .put((req, res) => {
  // define the edit stock route

    res.send('Edit stock route')
  })
  .delete((req, res) => {
  // define the remove stock route
  
    res.send('Remove stock route')
  })

module.exports = router
