var debug = false;
var KKTIX = {
  user: '',
  password: ''
};

if (debug) {
  options = {
    verbose: true,
    logLevel: "debug"
  };
} else {
  options = {};
}

var casper = require('casper').create(options);

/* login */
casper.start('https://kktix.com/users/sign_in');

casper.waitForSelector('form', function() {
    this.fill('form[action="/users/sign_in"]', {
        'user[login]': KKTIX.user,
        'user[password]': KKTIX.password
      }, true);
});

/* confirm if logged in */
casper.waitForSelector('#nav-user-display-id', function() {
  var user = this.evaluate(function() {
    return document.querySelector('#nav-user-display-id').textContent;
  });
  this.echo("Your name is " + user);
});

/* go to create event */
casper.thenOpen('https://kktix.com/dashboard/organizations/g0v-tw/events/new', function() {
  var slug = this.evaluate(function(){
    return document.querySelector('#event_slug').value;
  });
  this.echo("slug: " + slug);
});

casper.run();
