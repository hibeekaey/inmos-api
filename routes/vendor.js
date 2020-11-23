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

    client.query('SELECT DISTINCT vendor_id, vendor_name, contact FROM supplies NATURAL INNER JOIN vendor WHERE store_id = $1', [req.cookies.get('inmos_user', { signed: true })], (err, result) =>  {
      done()

      if (err) {
        return db.error(res, err, 'vendor lookup failed')
      }

      res.status(200).json({'status': 'success', 'message': 'vendor lookup completed', 'data': result.rows})
    })
  })
})
  .get('/list', (req, res) => {
    // define all vendor list route
    
    db.connect((err, client, done) => { // connect to db
      if (err) {
        return db.error(res, err, 'db connection failed')
      }
  
      client.query('SELECT vendor_id, vendor_name, contact FROM vendor', (err, result) =>  {
        done()
  
        if (err) {
          return db.error(res, err, 'vendor list lookup failed')
        }
  
        res.status(200).json({'status': 'success', 'message': 'vendor list lookup completed', 'data': result.rows})
      })
    })
  })
  .post('/new', (req, res) => {
  // define the add vendor route
    
    db.connect((err, client, done) => { // connect to db
      if (err) {
        return db.error(res, err, 'db connection failed')
      }

      client.query('INSERT INTO vendor (vendor_name, contact) VALUES ($1, $2) RETURNING *', [req.body.vendor_name, req.body.contact], (err, result) => {
        done()

        if (err) {
          return db.error(res, err, 'vendor upload failed')
        }

        res.status(201).json({'status': 'success', 'message': 'vendor upload completed', 'data': result.rows[0]})
      })
    })
  })
  .route('/:id')
  .get((req, res) => {
  // define the vendor route

    db.connect((err, client, done) => { // connect to db
      if (err) {
        return db.error(res, err, 'db connection failed')
      }

      client.query('SELECT * FROM vendor WHERE vendor_id = $1', [req.params.id], (err, result) =>  {
        done()

        if (err) {
          return db.error(res, err, 'vendor lookup failed')
        }

        res.status(200).json({'status': 'success', 'message': 'vendor lookup completed', 'data': result.rows[0]})
      })
    })
  })
  .put((req, res) => {
  // define the edit vendor route
  
    db.connect((err, client, done) => { // connect to db
      if (err) {
        return db.error(res, err, 'db connection failed')
      }

      client.query('UPDATE vendor SET vendor_name = $1, contact = $2 WHERE vendor_id = $3 RETURNING *', [req.body.vendor_name, req.body.contact, req.params.id], (err, result) => {
        done()
        
        if (err) {
          return db.error(res, err, 'vendor update failed')
        }

        res.status(201).json({'status': 'success', 'message': 'vendor update completed', 'data': result.rows[0]})
      })
    })
  })
  .delete((req, res) => {
  // define the remove vendor route
  
    db.connect((err, client, done) => { // connect to db
      if (err) {
        return db.error(res, err, 'db connection failed')
      }

      client.query('DELETE FROM vendor WHERE vendor_id = $1 RETURNING *', [req.params.id], (err, result) => {
        done()
        
        if (err) {
          return db.error(res, err, 'vendor removal failed')
        }

        res.status(201).json({'status': 'success', 'message': 'vendor removal completed', 'data': result.rows[0]})
      })
    })
  })

module.exports = router
