var config = require('../config');
var Hackpad = require('hackpad');

var client = new Hackpad(HACKPAD.client_id, HACKPAD.secret, { 'site': 'g0v' });

// get template
client.export('2ucl5ftrzot', 'latest', 'html', function(err, resp) {
  client.create(resp, 'text/html');
});
