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
  db.connect((err, client, done) => { // connect to db
    if (err) {
      return db.error(res, err, 'db connection failed')
    }

    client.query('SELECT stock_id, stock_name, category, quantity, cost_price, selling_price FROM inventory NATURAL INNER JOIN stock WHERE store_id = $1', [req.cookies.get('inmos_user', { signed: true })], (err, result) => {
      done()

      if (err) {
        return db.error(res, err, 'inventory lookup failed')
      }

      res.status(200).json({'status': 'success', 'message': 'inventory lookup completed', 'data': result.rows})
    })
  })
})
  .post('/new', (req, res) => {
  // define the add stock route
  
    db.connect((err, client, done) => { // connect to db
      if (err) {
        return db.error(res, err, 'db connection failed')
      }

      client.query('INSERT INTO stock (stock_name, category) VALUES ($1, $2) RETURNING stock_id, stock_name, category', [req.body.stock_name, req.body.category], (err, result) => {
        if (err) {
          return db.error(res, err, 'stock upload failed')
        }
        
        client.query('INSERT INTO inventory (stock_id, store_id) VALUES ($1, $2)', [result.rows[0].stock_id, req.cookies.get('inmos_user', { signed: true })], (err) => {
          done()

          if (err) {
            return db.error(res, err, 'inventory update failed')
          }
          
          let data = {'stock_id': result.rows[0].stock_id, 'stock_name': result.rows[0].stock_name, 'category': result.rows[0].category}

          res.status(201).json({'status': 'success', 'message': 'stock upload completed', 'data': data})
        })
      })
    })
  })
  .post('/supply', (req, res) => {
    // define the supply stock route

    db.connect((err, client, done) => { // connect to db
      if (err) {
        return db.error(res, err, 'db connection error')
      }

      client.query('UPDATE inventory SET quantity = quantity + $1, cost_price = $2 WHERE stock_id = $3 AND store_id = $4 RETURNING stock_id, store_id, quantity, cost_price', [req.body.quantity, req.body.cost_price, req.body.stock_id, req.cookies.get('inmos_user', { signed: true })], (err, result) => {
        if (err) {
          return db.error(res, err, 'inventory update failed')
        }

        if (result.rows.length > 0) {
          client.query('INSERT INTO supplies (store_id, vendor_id, stock_id, quantity, cost_price) VALUES ($1, $2, $3, $4, $5) RETURNING vendor_id, stock_id, quantity, cost_price', [result.rows[0].store_id, req.body.vendor_id, result.rows[0].stock_id, result.rows[0].quantity, result.rows[0].cost_price], (err, result) => {
            done()

            if (err) {
              return db.error(res, err, 'supplies update failed')
            }

            res.status(201).json({'status': 'success', 'message': 'stock supply completed', 'data': result.rows[0]})
          })
        } else {
          res.status(401).json({'status': 'error', 'message': 'stock supply failed, unauthorized'})
        }
      })
    })
  })
  .post('/sell', (req, res) => {
    // define the sell stock route

    db.connect((err, client, done) => { // connect to db
      if (err) {
        return db.error(res, err, 'db connection error')
      }

      client.query('UPDATE inventory SET quantity = quantity - $1, selling_price = $2 WHERE stock_id = $3 AND store_id = $4 RETURNING stock_id, store_id, quantity, selling_price', [req.body.quantity, req.body.selling_price, req.body.stock_id, req.cookies.get('inmos_user', { signed: true })], (err, result) => {
        if (err) {
          return db.error(res, err, 'inventory update failed')
        }

        if (result.rows.length > 0) {
          client.query('INSERT INTO sales (store_id, stock_id, quantity, selling_price) VALUES ($1, $2, $3, $4) RETURNING stock_id, quantity, selling_price', [result.rows[0].store_id, result.rows[0].stock_id, result.rows[0].quantity, result.rows[0].selling_price], (err, result) => {
            done()

            if (err) {
              return db.error(res, err, 'supplies update failed')
            }

            res.status(201).json({'status': 'success', 'message': 'stock sale completed', 'data': result.rows[0]})
          })
        } else {
          res.status(404).json({'status': 'error', 'message': 'stock sale failed, stock not available'})
        }
      })
    })
  })
  .route('/:id')
  .get((req, res) => {
  // define the stock route

    db.connect((err, client, done) => { // connect to db
      if (err) {
        return db.error(res, err, 'db connection failed')
      }

      client.query('SELECT stock_id, stock_name, category, quantity, cost_price, selling_price FROM inventory NATURAL INNER JOIN stock WHERE store_id = $1 AND stock_id = $2', [req.cookies.get('inmos_user', { signed: true }), req.params.id], (err, result) => {
        done()

        if (err) {
          return db.error(res, err, 'stock lookup failed')
        }

        res.status(200).json({'status': 'success', 'message': 'stock lookup completed', 'data': result.rows[0]})
      })
    })
  })
  .put((req, res) => {
  // define the edit stock route

    db.connect((err, client, done) => { // connect to db
      if (err) {
        return db.error(res, err, 'db connection failed')
      }

      client.query('UPDATE stock SET stock_name = $1, category = $2 WHERE stock_id = $3 RETURNING *', [req.body.stock_name, req.body.category, req.params.id], (err, result) => {
        done()

        if (err) {
          return db.error(res, err, 'stock update failed')
        }

        res.status(201).json({'status': 'success', 'message': 'stock update completed', 'data': result.rows[0]})
      })
    })
  })
  .delete((req, res) => {
  // define the remove stock route
  
    db.connect((err, client, done) => { // connect to db
      if (err) {
        return db.error(res, err, 'db connection failed')
      }

      client.query('DELETE FROM stock WHERE stock_id = $1 RETURNING *', [req.params.id], (err, result) => {
        done()

        if (err) {
          return db.error(res, err, 'stock removal failed')
        }

        res.status(201).json({'status': 'success', 'message': 'stock removal completed', 'data': result.rows[0]})
      })
    })
  })

module.exports = router
