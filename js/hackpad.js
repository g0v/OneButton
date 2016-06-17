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

// get template
client.export('2ucl5ftrzot', 'latest', 'html', function(err, resp) {

  var $ = cheerio.load(resp, {decodeEntities: false});

  // console.log(resp);
  // console.log($('body').html());

  // Set hackathon title
  $('h1').text('hackath' + padNum + 'n - '+ padName);

  // Set hackfoldr path
  // console.log($('p').eq(0).html());
  $('p').eq(0).html('<b>本次大松 hackfoldr：<a href="http://beta.hackfoldr.org/g0v-hackath' + padNum + ' n">http://beta.hackfoldr.org/g0v-hackath' + padNum + 'n</a></b>');

  $('p').each(function(i, el) {
    if ($(el).text() === 'hackfoldr：&nbsp;') {
      $(el).html('hackfoldr: <a href="http://beta.hackfoldr.org/g0v-hackath' + padNum + ' n">http://beta.hackfoldr.org/g0v-hackath' + padNum + 'n</a>');
    }
  })

  // Set hackathon time
  $('h2').each(function(i, el) {
    if ($(el).text() === '活動資訊') {
      $(el).next().next().text(padStartDayTime + ' ' + padStartHourTime + ' - ' + padEndDayTime + ' ' + padEndHourTime);
    }
  })

  // Create new pad with title
  client.create(new Buffer($('h1').html()), 'text/html', function(err, resp) {

    console.log(resp);
    console.log(err);

    var padId = resp['padId'];

    // Copy full content to new pad
    client.import(resp['padId'], new Buffer($('body').html()), 'text/html', function(err, resp) {
      console.log(resp);
      console.log(padId);
    });
  });

});
