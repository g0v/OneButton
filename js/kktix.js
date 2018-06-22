var debug = false;
if (debug) {
  options = {
    verbose: true,
    logLevel: "debug"
  };
} else {
  options = {};
}
options.waitTimeout = 20000;

var config = require('../config');
var casper = require('casper').create(options);

/* login */
casper.start('https://kktix.com/users/sign_in');

casper.waitForSelector('form', function() {
    this.fill('form[action="/users/sign_in"]', {
        'user[login]': config.KKTIX.login,
        'user[password]': config.KKTIX.password
      }, true);
});

/* confirm if logged in */
casper.waitForSelector('#nav-user-display-id', function() {
  var user = this.evaluate(function() {
    return document.querySelector('#nav-user-display-id').textContent;
  });
  casper.log('User Name: ' + user, 'debug');
});

/* fork event from template */
casper.thenOpen('https://kktix.com/dashboard/organizations/' + config.KKTIX.organization + '/events/new?fork_from=' + config.KKTIX.template, function() {

  var name = casper.cli.get("slug").replace('-', ' ') + ' | 台灣零時政府' + casper.cli.get("name");

  this.fill('form#new-event', {
    'event[name]': name,
    'event[slug]': casper.cli.get("slug"),
    'event[start_at]': casper.cli.get("start_at"),
    'event[end_at]': casper.cli.get("end_at")
  }, true);

  this.click('.breadcrumb li:nth-child(2)');

  var end_date_str = casper.cli.get("end_at");
  var end_date = end_date_str.split(' ');

  this.fill('form#new-event', {
    'tickets[][start_at]': casper.cli.get("signup_at") + ' 12:00',
    'tickets[][end_at]': end_date[0] + ' 9:00'
  }, true);
  

  this.click('.breadcrumb li:nth-child(3)');
  
});

casper.waitForSelector('button[type="submit"]', function() {
  document.querySelector('button[type="submit"]').click();
});


casper.run();
