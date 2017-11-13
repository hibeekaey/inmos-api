const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Accessing user endpoint')
  next()
})

// define the index route
router.get('/', (req, res) => {
  res.send('API for the Online Inventory Monitoring System')
})

// define the user authentication route
router.get('/auth/login', (req, res) => {
  res.send('User authentication')
})

// define the user registration route
router.get('/register', (req, res) => {
  res.send('User registration')
})

module.exports = router