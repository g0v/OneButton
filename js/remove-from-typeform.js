#!/usr/bin/env node
var runningAsScript = !module.parent;

require('es6-promise').polyfill();
require('isomorphic-fetch');
var httpClient = require('http-client');
var base = httpClient.base;
var header = httpClient.header;
var method = httpClient.method;
var parseText = httpClient.parseText;
var createFetch = httpClient.createFetch;
var path = require('path');
var config = require('../config');
var apiKey = config.TYPEFORM.api_key;

function run(formId) {
  var createForm = createFetch(
    base('https://api.typeform.io/v0.4/forms/' + formId),
    header('X-API-TOKEN', apiKey),
    method('DELETE'),
    parseText()
  );

  var promise = createForm()
    .then(function(resp) { return resp.textString; }); // form id
  return promise;
}

if (runningAsScript) {
  var argv = process.argv;
  if (argv.length !== 3) {
    console.log('./remove-from-typeform.js <form id>');
    process.exit(-1);
  }
  run()
    .then(console.log.bind(console))
    .catch(console.error.bind(console));
} else {
  module.exports = run;
}
