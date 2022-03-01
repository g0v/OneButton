var params = {};
for (var argv of process.argv) {
  var matches = argv.match(/^--([^=]*)=(.*)$/);
  if (matches) {
    params[matches[1]] = matches[2];
  }
}

var config = require('../config');
const puppeteer = require('puppeteer');

/* login */
(async () => {
  const browser = await puppeteer.launch({
  });
  const page = await browser.newPage();
  page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));

  await page.goto('https://kktix.com/users/sign_in');

  console.log('login to kktix');
  await page.waitForSelector('form');
  await page.type('#user_login', config.KKTIX.login);
  await page.type('#user_password', config.KKTIX.password);
  await page.click('[type=submit]');


  console.log('login to kktix done');
  /* confirm if logged in */
  await page.waitForSelector('#nav-user-display-id');

  /* fork event from template */
  await page.goto('https://kktix.com/dashboard/organizations/' + config.KKTIX.organization + '/events/new?fork_from=' + config.KKTIX.template);

  var name = params["slug"].replace('-', ' ') + ' | 台灣零時政府' + params['name'];

  await page.evaluate( (name) => document.getElementById("event_name").value = name, name);
  await page.evaluate( (slug) => document.getElementById("event_slug").value = slug, params['slug']);
  await page.evaluate( (start_at) => document.getElementById("event_start_at").value = start_at, params['start_at']);
  await page.evaluate( (end_at) => document.getElementById("event_end_at").value = end_at, params['end_at']);

  await page.click('.breadcrumb li:nth-child(2)');
  var end_date_str = params['end_at'];
  var end_date = end_date_str.split(' ');

  await page.evaluate( (signup_at) => {
    nodes = document.querySelectorAll('[name="tickets[][start_at]"]');
    for (var i = 0; i < nodes.length; i ++) {
      node = nodes[i];
      node.value = signup_at;
    }
  }, params['signup_at'] +  ' 12:00');

  await page.evaluate( (end_at) => {
    nodes = document.querySelectorAll('[name="tickets[][end_at]"]');
    for (var i = 0; i < nodes.length; i ++) {
      node = nodes[i];
      node.value = end_at;
    }
  }, end_date[0] + ' 09:00');

  await page.waitForSelector('.breadcrumb li:nth-child(3)');
  await page.click('.breadcrumb li:nth-child(3)');

  await page.waitForSelector('[name="formSettings[type]"]:nth-child(1)');
  await page.click('[name="formSettings[type]"]:nth-child(1)');

  await page.waitForSelector('[name="hasOrderDataDeadline"]:nth-child(1)');
  await page.click('[name="hasOrderDataDeadline"]:nth-child(1)');

  await page.screenshot({ path: 'all.png' });
  await page.waitForSelector('button[type="submit"]');
  await page.click('button[type="submit"]');
  await page.screenshot({ path: 'all.png' });

  await browser.close();
})();
