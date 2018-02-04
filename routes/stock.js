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
  
    db.connect((err, client, done) => { // connect to db
      if (err) {
        return db.error(res, err, 'db connection failed')
      }

      client.query('INSERT INTO stock (stock_name, category) VALUES ($1, $2) RETURNING stock_id', [req.body.stock_name, req.body.category], (err, result) => {
        if (err) {
          return db.error(res, err, 'stock upload failed')
        }
        
        client.query('INSERT INTO inventory (stock_id, store_id, cost_price) VALUES ($1, $2, $3)', [result.rows[0].stock_id, req.cookies.get('inmos_user', { signed: true }), 1.00], (err) => {
          done()

          if (err) {
            return db.error(res, err, 'inventory update failed')
          }

          res.status(200).json({'status': 'success', 'message': 'stocked upload completed'})
        })
      })
    })
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
