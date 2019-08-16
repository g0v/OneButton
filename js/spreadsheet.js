var fs = require('fs');
var config = require('../config');
require('isomorphic-fetch');
var httpClient = require('http-client');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

var thonNum           = process.argv[2];
var thonName          = process.argv[3];

// Load client secrets from a local file.
fs.readFile(config.GAPI.secret_path, function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  authorize(JSON.parse(content), copyFile);
});

function authorize(credentials, callback) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(config.GAPI.token_path, function(err, token) {
    if (err) {
      console.log("Google oauth token is not available. Use 'node js/gapi-gen-token.js' to create one");
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
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
      var spreadsheet_url = "https://docs.google.com/spreadsheets/d/" + response.id
      var createShorten = httpClient.createFetch(
        httpClient.base('https://api-ssl.bitly.com/v3'),
        httpClient.parseJSON()
      )

      var promoise = createShorten('/shorten?access_token=' + config.BITLY.access_token + '&longUrl=' + spreadsheet_url)
        .then(function(resp){
          var ret = resp.jsonData;
          if (ret.status_code != 200) {
              console.log(ret.status_txt);
          } else {
              console.log(ret.data.url);
          }
      });
    }
  });
}
