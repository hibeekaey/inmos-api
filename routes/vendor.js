const express = require('express')
const router = express.Router()

// user authentication lib
const auth = require('../lib/auth')

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Accessing vendor endpoint')
  next()
})

// define the vendor route
router.get('/', (req, res) => {
  res.send('Vendor list route')
})

// define the add vendor item route
router.get('/new', (req, res) => {
  res.send('Add vendor route')
})

// define the vendor item route
router.get('/:id', (req, res) => {
  res.send('Vendor route')
})

module.exports = router