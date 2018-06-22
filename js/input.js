var config = require('../config');
var inquirer = require('inquirer');
var moment = require('moment-natural');
var hackfoldr = require('./hackfoldr');
var typeform = require('./typeform');
var exec = require('child_process').exec;

config.HACKPAD.site = config.HACKPAD.site || 'g0v.hackpad.tw';

/* next Saturday */
var default_start_moment = moment.natural('09:00 next saturday');
default_start_moment = default_start_moment.natural('+7d');
var default_start_at = default_start_moment.format('YYYY/MM/DD HH:mm');

var default_end_moment = moment.natural('18:00 next saturday');
default_end_moment = default_end_moment.natural('+7d');
var default_end_at = default_end_moment.format('YYYY/MM/DD HH:mm');

/* 12 days before start date(? */
var default_signup_at = default_start_moment.subtract(12, 'days').add(3, 'hours').format('MM/DD');

var isNumeric = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

var questions = [
  {
    type: 'input',
    name: 'times',
    message: '第幾次大松（數字）',
    validate: function(value) {
      var pass = isNumeric(value);
      if (pass) {
        return true;
      }
      return '必須是數字！';
    }
  },
  {
    type: 'input',
    name: 'name',
    message: '大松名稱',
    default: function() {
      return '第廿四次謝頓危機松';
    }
  },
  {
    type: 'input',
    name: 'start_at',
    message: '開始時間',
    default: function() {
      return default_start_at;
    },
    validate: function(value) {
      var pass = value.match(/(\d{4}\/\d{2}\/\d{2} \d{2}:\d{2})/);
      if (pass) {
        return true;
      }
      return '時間格式錯啦！';
    }
  },
  {
    type: 'input',
    name: 'end_at',
    message: '結束時間',
    default: function() {
      return default_end_at;
    },
    validate: function(value) {
      var pass = value.match(/(\d{4}\/\d{2}\/\d{2} \d{2}:\d{2})/);
      if (pass) {
        return true;
      }
      return '時間格式錯啦！';
    }
  },
  {
    type: 'input',
    name: 'signup_at',
    message: '註冊時間',
    default: function() {
      return default_signup_at;
    },
    validate: function(value) {
      var pass = value.match(/(\d{2}\/\d{2})/);
      if (pass) {
        return true;
      }
      return '時間格式錯啦！';
    }
  }
];

inquirer.prompt(questions).then(function (answers) {
  var slug = "g0v-hackath" + answers.times + "n";
  console.log('開始...');
  console.log('--------');

  console.log('建立 KKTIX 活動...');
  var cmd = './node_modules/.bin/casperjs --slug="' + slug + '" --name="' + answers.name + '" --start_at="' + answers.start_at + '" --end_at="' + answers.end_at + '" --signup_at="' + answers.signup_at + '" js/kktix.js';

  exec(cmd, function(err, stdout, stderr) {
    console.log('建完活動啦... https://kktix.com/dashboard/events/' + slug);
    console.log('--------');
  });

  console.log('建立 hackpad...');
  var cmd = 'node js/hackpad.js ' + answers.times + ' ' + answers.name + ' ' + answers.start_at + ' ' + answers.end_at;

  exec(cmd, function(err, stdout, stderr) {
    var padID = stdout.split('\n').slice(-2)[0];
    console.log('建完 hackpad 啦... https://' + config.HACKPAD.site + '/' + padID);
    console.log('--------');

    console.log('建立 Google Spreadsheet...');
    var cmd = 'node js/spreadsheet.js ' + answers.times + ' ' + answers.name;
    exec(cmd, function(err, stdout, stderr) {
      var spreadsheetUrl = stdout.split("\n")[0];
      console.log('建完 Spreadsheet 啦... ' + spreadsheetUrl);


      console.log('建立 hackfoldr...')
      hackfoldr(answers.times, answers.name, padID, answers.start_at, answers.signup_at, spreadsheetUrl)
        .then(function(sheetID) { console.log('建完 hackfoldr 啦... https://beta.hackfoldr.org' + sheetID) })
        .catch(console.error.bind(console));

      //console.log('建立會後問券...')
      //typeform(answers.name)
      //  .then(function(result) { console.log('建完會後問券啦... ' + result.links[1].href + ', id: ' + result.id) })
       // .catch(console.error.bind(console));
    });
  });
});
