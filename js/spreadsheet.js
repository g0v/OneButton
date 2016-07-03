var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

var thonNum           = process.argv[2];
var thonName          = process.argv[3];

// If modifying these scopes, delete your previously saved credentials: g0v-fire-button.json
var SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  "https://www.googleapis.com/auth/drive"];
var TOKEN_PATH = 'g0v-fire-button.json';

// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the
  // Google Sheets API.
  authorize(JSON.parse(content), copyFile);
});

function authorize(credentials, callback) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
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
      fs.writeFile(TOKEN_PATH, JSON.stringify(token));
      console.log('Token stored to ' + TOKEN_PATH);
      callback(oauth2Client);
    });
  });
}

function copyFile(auth) {
  var drive = google.drive('v3');
  drive.files.copy({
    'auth': auth,
    'fileId': "12P8HzwMW41wXTFApmjeqw5SUg_smjJrzfi3JWQQk6Cc", // File id of "hackathon schedule template NEW"
    'resource': {
      'name': "hackath" + thonNum + "n | " + thonName + " 專案列表 ", // New file name
      'parents': [
        '0B00j8_vTJFGUdmJKT0NsS2lHbHc' // Google driver folder "Hackathon schedule"
      ]
    }
  }, function(err, response){
    if (err) {
      console.log(err)
    } else {
      console.log("https://docs.google.com/spreadsheets/d/" + response.id)
    }
  });
}
