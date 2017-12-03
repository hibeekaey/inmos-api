/*!
 * inmos-api
 * Copyright (c) 2017 Ibukun O. Dairo
 * MIT Licensed
 */

'use strict'

/**
 * Module dependencies.
 */

// crypt lib
const hash = require('./crypt')

// access db lib
const db = require('./db')

module.exports = (req, res, next) => {
  // authentication module
  
  // check if user is already authenticated
  if (req.cookies.get('inmos_user', { signed: true })) {
    console.log('User authenticated')
    
    next()
  } else if (req.body.store_id && req.body.password) {
    // authenticate user

    db.connect((err, client, done) => { //connect to db
      if (err) {
        return db.error(res, err, 'db connection failed')
      }
      
      client.query('SELECT password FROM store WHERE store_id = $1', [req.body.store_id], (err, result) => {
        done()

        if (err) {
          return db.error(res, err, 'user lookup failed')
        }

        // check if user exists
        if (result.rowCount) {
          if (result.rows[0].password == req.body.password) {
            req.cookies.set('inmos_user', req.body.store_id, { signed: true })
            next()
          } else {
            res.status(401).json({'status': 'error', 'message': 'user authentication failed'})
          }
        } else {
          res.status(404).json({'status': 'error', 'message': 'user not found'})
        }
      })
    })
  } else {
    res.status(401).json({'status': 'error', 'message': 'user authentication required'})
  }
}
