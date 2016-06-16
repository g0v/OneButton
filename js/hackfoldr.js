#!/usr/bin/env node
var runningAsScript = !module.parent;

require('es6-promise').polyfill();
require('isomorphic-fetch');
var httpClient = require('http-client');
var base = httpClient.base;
var json = httpClient.json;
var header = httpClient.header;
var body = httpClient.body;
var method = httpClient.method;
var parseText = httpClient.parseText;
var createFetch = httpClient.createFetch;
var ramda = require('ramda');
var toPairs = ramda.toPairs;
var reduce = ramda.reduce;
var fs = require('fs');
var path = require('path');

function genSnapshot(template, obj) {
  return reduce(function(acc, pair) {
    var key = pair[0];
    var value = (pair[1] + '').replace(/:/g, '\\c');
    var regexp = new RegExp('\\$\{' + key + '\}', 'g');
    return acc.replace(regexp, value);
  }, template, toPairs(obj));
}

function fixContentLength() {
  return function(fetch, input, options) {
    return header('Content-Length', Buffer.byteLength(options.body))(fetch, input, options);
  }
}

function run(times, name, begin_at, signup_at, spreadsheet_link) {
  times = times || 0;
  name = name || '第零次動員戡亂黑客松';
  begin_at = begin_at || '2012/12/01 09:00';
  signup_at = signup_at || '2012/12/01 09:00'; // 有人記得第零次的報名時間嗎 XD
  spreadsheet_link = spreadsheet_link || 'http://bit.ly/g0v-hackath' + times + 'n';

  var templatePath = path.join(__dirname, '../tmpl/ethercalc.sc');
  var template = fs.readFileSync(templatePath).toString();
  var snapshot = genSnapshot(template, {
    name: name,
    begin_at: begin_at,
    signup_at: signup_at,
    spreadsheet_link: spreadsheet_link
  });

  var roomName = 'g0v-hackath' + times + 'n';
  var createRoom = createFetch(
    base('https://ethercalc.org/_'),
    json({ room: roomName, snapshot: snapshot }),
    fixContentLength(),
    method('POST'),
    parseText()
  );

  var promise = createRoom()
    .then(function(resp) { return resp.textString; }); // sheet path
  return promise;
}

if (runningAsScript) {
  var argv = process.argv;
  if (argv.length !== 6 || argv.length !== 7) {
    console.log('./hackfoldr.js <times> <name> <begin_at> <signup_at> [spreadsheet_link]');
    process.exit(-1);
  }
  // ./hackfoldr.js 321 第三二一次謝頓危機松 2077/10/23+09:00 2077/10/11+12:00
  run(+argv[2], argv[3], argv[4].replace(/\+/g, ' '), argv[5].replace(/\+/g, ' '), argv[6])
    .then(console.log.bind(console))
    .catch(console.error.bind(console));
} else {
  module.exports = run;
}
