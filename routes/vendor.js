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
  console.log('Accessing vendor endpoint')
  
  next()
})

// authenticate user
router.use(authenticate)

// define the vendor list route
router.get('/all', (req, res) => {
  res.send('All vendors route')
})
  .put('/new', (req, res) => {
  // define the add vendor route
  
    res.send('Add vendor route')
  })
  .route('/:id')
  .get((req, res) => {
  // define the vendor route

    res.send('Vendor route')
  })
  .put((req, res) => {
  // define the edit vendor route
  
    res.send('Edit vendor route')
  })
  .delete((req, res) => {
  // define the remove vendor route
  
    res.send('Remove vendor route')
  })

module.exports = router
