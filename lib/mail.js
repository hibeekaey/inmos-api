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

const mailer = require('nodemailer')

// create a SMTP transporter object
const transporter = mailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    type: 'OAuth2',
    user: process.env.GMAIL_USERNAME,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN
  }
})

// mailer module
module.exports = (email, subject, message) => {
  // message object
  let payload = {
    from: 'Inmos <support@inmos.com.ng>',
    to: email,
    subject: subject,
    html: message
  }

  transporter.sendMail(payload, (err, res) => {
    if (err) {
      console.error(`SendMail error: ${err.message}\n${err.stack}`)
      
      return process.exit(1)
    }

    console.log('Message sent: %s', res.messageId)
  })
}