var client_id = '';
var secret = '';

var Hackpad = require('hackpad');

var client = new Hackpad(client_id, secret, { 'site': 'g0v' });

// get template
client.export('2ucl5ftrzot', 'latest', 'html', function(err, resp) {
  client.create(resp, 'text/html');
});
