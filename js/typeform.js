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

/**
 * XXX: about the shape field in rating question
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
      // register this form to the callback webhook
      return createFetch(
        base(webhookSubmitUrl),
        json(jsonData),
        method('PUT')
      )()
        .then(function() { return jsonData._links[1].href });
    });

  return promise;
}

if (runningAsScript) {
  var argv = process.argv;
  if (argv.length !== 2) {
    console.log('usage: ./typeform.js');
    process.exit(-1);
  }
  run()
    .then(console.log.bind(console))
    .catch(console.error.bind(console));
} else {
  module.exports = run;
}
