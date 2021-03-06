/*!
 * inmos-api
 * Copyright (c) 2020 Sulihat
 * MIT Licensed
 */

'use strict'

/**
 * Module dependencies.
 */

const crypto = require('crypto')

// hash password
module.exports = (password, salt, iterations, keylen, digest) => {
  return crypto.pbkdf2Sync(password, salt, iterations, keylen, digest)
}
