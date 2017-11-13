const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Accessing stock endpoint')
  next()
})

// define the stock route
router.get('/', (req, res) => {
  res.send('Stock route')
})

// define the add stock item route
router.get('/new', (req, res) => {
  res.send('Add stock item route')
})

// define the stock item route
router.get('/:id', (req, res) => {
  res.send('Stock item route')
})

module.exports = router