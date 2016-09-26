#!/usr/bin/env node
var runningAsScript = !module.parent;

require('es6-promise').polyfill();
require('isomorphic-fetch');
var httpClient = require('http-client');
var base = httpClient.base;
var json = httpClient.json;
var header = httpClient.header;
var method = httpClient.method;
var parseJSON = httpClient.parseJSON;
var createFetch = httpClient.createFetch;
var ramda = require('ramda');
var toPairs = ramda.toPairs;
var reduce = ramda.reduce;
var fs = require('fs');
var path = require('path');
var config = require('../config');
var apiKey = config.TYPEFORM.api_key;
var webhookSubmitUrl = config.TYPEFORM.webhook_submit_url;

function genSnapshot(template, obj) {
  return reduce(function(acc, pair) {
    var key = pair[0];
    var value = (pair[1] + '').replace(/:/g, '\\c');
    var regexp = new RegExp('\\$\{' + key + '\}', 'g');
    return acc.replace(regexp, value);
  }, template, toPairs(obj));
}

/**
 * XXX: about shape in rating question
 * shape must be one of the following: "star", "heart", "user", "up", "crown",
 * "cat", "dog", "circle", "flag", "droplet", "tick", "lightbulb", "trophy",
 * "cloud", "thunderbolt", "pencil", "skull"
 */
function run() {
  var templatePath = path.join(__dirname, '../tmpl/typeform.json');
  var template = JSON.parse(fs.readFileSync(templatePath).toString());
  template.webhook_submit_url = webhookSubmitUrl;

  var createForm = createFetch(
    base('https://api.typeform.io/v0.4/forms'),
    header('X-API-TOKEN', apiKey),
    json(template),
    method('POST'),
    parseJSON()
  );

  var promise = createForm()
    .then(function(resp) {
      return resp.jsonData;
    })
    .then(function(jsonData) {
      return createFetch(
        base(webhookSubmitUrl),
        json(jsonData),
        method('PUT')
      )()
        .then(function() { return jsonData });
    });

  return promise;
}

if (runningAsScript) {
  var argv = process.argv;
  if (argv.length !== 2) {
    // ./hackfoldr.js 321 第三二一次謝頓危機松 2077/10/23+09:00 10/11
    console.log('./typeform.js <times> <name> <hackpad ID> <begin_at YYYY/MM/DD+HH:mm> <signup_at MM/DD> [spreadsheet_link]');
    process.exit(-1);
  }
  run()
    .then(console.log.bind(console))
    .catch(console.error.bind(console));
} else {
  module.exports = run;
}
