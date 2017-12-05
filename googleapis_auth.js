/*!
 * inmos-api
 * Copyright (c) 2017 Ibukun O. Dairo
 * MIT Licensed
 */

'use strict'

/**
 * Module dependencies.
 */

const fs = require('fs')
const readline = require('readline')
const google = require('googleapis')
const googleAuth = require('google-auth-library')

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/gmail-nodejs-quickstart.json
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly', 'https://mail.google.com/']
const TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/'
const TOKEN_PATH = TOKEN_DIR + 'gmail-nodejs-quickstart.json'

// Load client secrets from a local file.
fs.readFile('client_secret.json', (err, content) => {
  if (err) {
    return console.log('Error loading client secret file: ' + err)
  }
  // Authorize a client with the loaded credentials, then call the
  // Gmail API.
  authorize(JSON.parse(content), listLabels)
})

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
const authorize = (credentials, callback) => {
  let clientSecret = credentials.installed.client_secret
  let clientId = credentials.installed.client_id
  let redirectUrl = credentials.installed.redirect_uris[0]
  let auth = new googleAuth()
  let oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl)

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) {
      getNewToken(oauth2Client, callback)
    } else {
      oauth2Client.credentials = JSON.parse(token)

      callback(oauth2Client)
    }
  })
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
const getNewToken = (oauth2Client, callback) => {
  let authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  })
  
  console.log('Authorize this app by visiting this url: ', authUrl)
  
  let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close()
    
    oauth2Client.getToken(code, (err, token) => {
      if (err) {
        return console.log('Error while trying to retrieve access token', err)
      }
      
      oauth2Client.credentials = token
      storeToken(token)
      callback(oauth2Client)
    })
  })
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
const storeToken = (token) => {
  try {
    fs.mkdirSync(TOKEN_DIR)
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err
    }
  }
  
  fs.writeFile(TOKEN_PATH, JSON.stringify(token))
  
  console.log('Token stored to ' + TOKEN_PATH)
}

/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
const listLabels = (auth) => {
  let gmail = google.gmail('v1')
  
  gmail.users.labels.list({
    auth: auth,
    userId: 'me',
  }, (err, response) => {
    if (err) {
      return console.log('The API returned an error: ' + err)
    }
    
    let labels = response.labels
    
    if (labels.length == 0) {
      console.log('No labels found.')
    } else {
      console.log('Labels:')
      
      for (let i = 0; i < labels.length; i++) {
        const label = labels[i]
        
        console.log('- %s', label.name)
      }
    }
  })
}
