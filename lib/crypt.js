/*!
 * inmos-api
 * Copyright (c) 2017 Ibukun O. Dairo
 * MIT Licensed
 */

'use strict'

/**
 * Module dependencies.
 */

const crypto = require('crypto')

// hash password
module.exports = (password, salt, iterations, keylen, digest, callback) => {
  return crypto.pbkdf2(password, salt, iterations, keylen, digest, callback)
}
