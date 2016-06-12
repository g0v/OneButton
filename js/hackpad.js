var client_id = 'BeSsWjT8Ok1';
var secret = 'Ghs6tN079yNXXWlloEuy76IIzQoGf3Vw';

var Hackpad = require('hackpad');

var client = new Hackpad(client_id, secret, { 'site': 'g0v' });

var template;

// get template
client.export('2ucl5ftrzot', 'latest', 'html', function(err, resp) {
   template = resp;
});

// generate new pad from template
// client.create(template, 'text/html');
