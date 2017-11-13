const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Accessing analytics endpoint')
  next()
})

// define the analytics route
router.get('/', (req, res) => {
  res.send('Analytics route')
})

// define general analytics route
router.get('/general', (req, res) => {
  res.send('General analytics route')
})

// define stock analytics route
router.get('/stock', (req, res) => {
  res.send('Stock analytics route')
})


module.exports = router