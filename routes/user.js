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

const express = require('express')
const router = express.Router()

// user authentication lib
const authenticate = require('../lib/auth')

// crypt lib
const hash = require('../lib/crypt')

// access db lib
const db = require('../lib/db')

// mail lib
const mail = require('../lib/mail')

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

      // hash password
      let password = hash(req.body.password, process.env.SALT, 100000, 32, 'sha512').toString('hex')

      client.query('INSERT INTO store (store_name, password, contact) VALUES ($1, $2, $3) RETURNING store_id, contact', [req.body.store_name, password, req.body.contact], (err, result) => {
        done()

        if (err) {
          return db.error(res, err, 'store registration failed')
        }

        // send store_id to user's mail
        mail(result.rows[0].contact.email[0], 'Store Registration Completed', result.rows[0].store_id)

        res.status(201).json({'status': 'success', 'message': 'store registration completed', 'store_id': result.rows[0].store_id})
      })
    })
  })

module.exports = router
