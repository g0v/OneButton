#!/usr/bin/env node
var runningAsScript = !module.parent;

require('es6-promise').polyfill();
require('isomorphic-fetch');

var template = require('../tmpl/typeform');

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
function run(name) {
  var tmpl = template({ name: name });
  tmpl.webhook_submit_url = webhookSubmitUrl;

  var createForm = createFetch(
    base('https://api.typeform.io/v0.4/forms'),
    header('X-API-TOKEN', apiKey),
    json(tmpl),
    method('POST'),
    parseJSON()
  );

  var promise = createForm()
    .then(function(resp) {
      return resp.jsonData;
    })
    .then(function(jsonData) {
      var id = jsonData.id;
      var links = jsonData._links;

      // register this form to the callback webhook
      return createFetch(
        base(webhookSubmitUrl),
        json(jsonData),
        method('PUT')
      )()
        .then(function() { return { id: id, links: links } });
    });

  return promise;
}

if (runningAsScript) {
  var argv = process.argv;
  if (argv.length !== 3) {
    console.log('usage: ./typeform.js <name>');
    process.exit(-1);
  }
  run(argv[2])
    .then(console.log.bind(console))
    .catch(console.error.bind(console));
} else {
  module.exports = run;
}
