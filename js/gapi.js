var config = require('../config');
var Hackpad = require('hackpad');
var cheerio = require('cheerio');

var client = new Hackpad(config.HACKPAD.client_id, config.HACKPAD.secret, { 'site': 'g0v' });

var padNum           = process.argv[2];
var padName          = process.argv[3];
var padStartDayTime  = process.argv[4];
var padStartHourTime = process.argv[5];
var padEndDayTime    = process.argv[6];
var padEndHourTime   = process.argv[7];

auth();

  function auth() {
    var config = {
      'client_id': 'YOUR CLIENT ID',
      'scope': 'https://www.googleapis.com/auth/urlshortener'
    };
    gapi.auth.authorize(config, function() {
      console.log('login complete');
      console.log(gapi.auth.getToken());
    });
  }
