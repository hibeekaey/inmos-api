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
  db.connect((err, client, done) => { // connect to db
    if (err) {
      return db.error(res, err, 'db connection failed')
    }
    
    client.query('SELECT SUM(quantity) AS total_quantity, SUM(quantity * cost_price) AS total_value FROM inventory WHERE store_id = $1', [req.cookies.get('inmos_user', { signed: true })], (err, result) => {
      done()

      if (err) {
        return db.error(res, err, 'all analytics lookup failed')
      }
      
      res.status(201).json({'status': 'success', 'message': 'all analytics lookup completed', 'data': result.rows[0]})
    })
  })
})
  .get('/sales', (req, res) => {
  // define general analytics route

    db.connect((err, client, done) => { // connect to db
      if (err) {
        return db.error(res, err, 'db connection failed')
      }
      
      client.query('SELECT date_time, SUM(quantity * selling_price) AS total_sales FROM sales WHERE store_id = $1 GROUP BY EXTRACT(DAY FROM date_time)', [req.cookies.get('inmos_user', { signed: true })], (err, result) => {
        done()
        console.log(err)
        if (err) {
          return db.error(res, err, 'sales analytics lookup failed')
        }
        
        res.status(201).json({'status': 'success', 'message': 'sales analytics lookup completed', 'data': result.rows})
      })
    })
  })
  .get('/stock', (req, res) => {
  // define stock analytics route

    db.connect((err, client, done) => { // connect to db
      if (err) {
        return db.error(res, err, 'db connection failed')
      }
      
      client.query('SELECT SUM(quantity) AS total_quantity, SUM(quantity * cost_price) AS total_value FROM inventory WHERE store_id = $1', [req.cookies.get('inmos_user', { signed: true })], (err, result) => {
        done()

        if (err) {
          return db.error(res, err, 'stock analytics lookup failed')
        }
        
        res.status(201).json({'status': 'success', 'message': 'stock analytics lookup completed', 'data': result.rows[0]})
      })
    })
  })

module.exports = router
