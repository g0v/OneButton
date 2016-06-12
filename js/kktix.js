var debug = false;
if (debug) {
  options = {
    verbose: true,
    logLevel: "debug"
  };
} else {
  options = {};
}

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
  this.fill('form#new-event', {
    'event[name]': casper.cli.get("name"),
    'event[slug]': casper.cli.get("slug"),
    'event[capacity]': 100,
    'event[start_at]': casper.cli.get("start_at"),
    'event[end_at]': casper.cli.get("end_at")
  }, true);

  this.click('.breadcrumb li:nth-child(3)');
});

casper.waitForSelector('button[type="submit"]', function() {
  document.querySelector('button[type="submit"]').click();
});

casper.run();
