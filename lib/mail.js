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

const mailer = require('nodemailer')

let transporter
mailer.createTestAccount().then(testAccount => {
  // create a SMTP transporter object
  transporter = mailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  })
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