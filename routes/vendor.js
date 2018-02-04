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
  db.connect((err, client, done) => { // connect to db
    if (err) {
      return db.error(res, err, 'db connection failed')
    }

    client.query('SELECT vendor_id FROM vendor WHERE')
  })
})
  .put('/new', (req, res) => {
  // define the add vendor route
    
    db.connect((err, client, done) => { // connect to db
      if (err) {
        return db.error(res, err, 'db connection failed')
      }

      client.query('INSERT INTO vendor (vendor_name, contact) VALUES ($1, $2)', [req.body.vendor_name, req.body.contact], (err) => {
        done()

        if (err) {
          return db.error(res, err, 'vendor upload failed')
        }

        res.status(200).json({'status': 'success', 'message': 'vendor upload completed'})
      })
    })
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
