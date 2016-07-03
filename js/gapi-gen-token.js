var fs = require('fs');
var config = require('../config');
var readline = require('readline');
var googleAuth = require('google-auth-library');

// If modifying these scopes, delete your previously saved credentials: .gapi-token.json
var SCOPES = ["https://www.googleapis.com/auth/drive"];

// Load client secrets from a local file.
fs.readFile(config.GAPI.secret_path, function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the
  // Google Sheets API.

  var credentials = JSON.parse(content)
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  checkToken(config.GAPI.token_path, oauth2Client)
});

function checkToken(token_path, oauth2Client) {
  fs.readFile(token_path, function(err, token) {
    if (err) {
      getNewToken(oauth2Client);
    } else {
      console.log("Token is created.")
    }
  });
}

function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      fs.writeFile(config.GAPI.token_path, JSON.stringify(token));
      console.log('Token stored to ' + config.GAPI.token_path);
      if (callback) {
        callback(oauth2Client);
      }
    });
  });
}
