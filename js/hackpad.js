var config = require('../config');
var Hackpad = require('hackpad');
var cheerio = require('cheerio');

var client = new Hackpad(HACKPAD.client_id, HACKPAD.secret, { 'site': 'g0v' });

// get template
client.export('2ucl5ftrzot', 'latest', 'html', function(err, resp) {

  var $ = cheerio.load(resp, {decodeEntities: false});

  // console.log(resp);
  // console.log($('body').html());

  // Set hackpad title
  $('h1').text('hackathxn - 第20次名稱黑客松');

  // Create new pad with title
  client.create(new Buffer($('h1').html()), 'text/html', function(err, resp) {

    console.log(resp);
    console.log(err);

    // Copy full content to new pad
    client.import(resp['padId'], new Buffer($('body').html()), 'text/html', function(err, resp) {
      console.log(resp);
    });
  });

});
