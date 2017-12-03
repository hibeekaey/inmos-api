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

// crypt lib
const hash = require('../lib/crypt')

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
  .post('/auth/login', authenticate, (req, res) => {
  // define the user authentication route
    
    res.status(200).json({'status': 'success', 'message': 'user authentication completed'})
  })
  .post('/register', (req, res) => {
  // define the user registration route

    db.connect((err, client, done) => { // connect to db
      if (err) {
        return db.error(res, err, 'db connection failed')
      }

      client.query('INSERT INTO store (store_name, password, contact) VALUES ($1, $2, $3)', [req.body.store_name, req.body.password, req.body.contact], (err, result) => {
        done()

        if (err) {
          return db.error(res, err, 'store registration failed')
        }

        res.status(200).json({'status': 'success', 'message': 'store registration completed'})
      })
    })
  })

module.exports = router
