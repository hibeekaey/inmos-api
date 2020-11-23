/* eslint-disable no-console */
/*!
 * inmos-api
 * Copyright (c) 2017 Smooth
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
    
    client.query('SELECT SUM(quantity) AS total_quantity, SUM(quantity * cost_price) AS total_value FROM inventory WHERE store_id = $1', [req.cookies.get('inmos_user', { signed: true })], (err, result1) => {
      if (err) {
        return db.error(res, err, 'all analytics lookup failed')
      }

      client.query('SELECT SUBSTRING(date_time::text FROM 1 FOR 10) AS date, SUM(quantity * selling_price) AS total_sales FROM sales WHERE store_id = $1 GROUP BY date ORDER BY date DESC', [req.cookies.get('inmos_user', { signed: true })], (err, result2) => {
        done()
        
        if (err) {
          return db.error(res, err, 'sales analytics lookup failed')
        }
        
        let data = {'stock': result1.rows[0], 'sales': result2.rows}

        res.status(200).json({'status': 'success', 'message': 'all analytics lookup completed', 'data': data})
      })
    })
  })
})
  .get('/sales', (req, res) => {
  // define general analytics route

    db.connect((err, client, done) => { // connect to db
      if (err) {
        return db.error(res, err, 'db connection failed')
      }
      
      client.query('SELECT SUBSTRING(date_time::text FROM 1 FOR 10) AS date, SUM(quantity * selling_price) AS total_sales FROM sales WHERE store_id = $1 GROUP BY date ORDER BY date DESC', [req.cookies.get('inmos_user', { signed: true })], (err, result) => {
        done()
        
        if (err) {
          return db.error(res, err, 'sales analytics lookup failed')
        }
        
        res.status(200).json({'status': 'success', 'message': 'sales analytics lookup completed', 'data': result.rows})
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
        
        res.status(200).json({'status': 'success', 'message': 'stock analytics lookup completed', 'data': result.rows[0]})
      })
    })
  })

module.exports = router
