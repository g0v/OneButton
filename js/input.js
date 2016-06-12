var inquirer = require('inquirer');
var moment = require('moment-natural');

/* next Saturday */
var default_begin_date = moment.natural('09:00 next saturday').format('YYYY/MM/DD HH:mm');
var default_end_date = moment.natural('18:00 next saturday').format('YYYY/MM/DD HH:mm');

var questions = [
  {
    type: 'input',
    name: 'times',
    message: '第幾次大松'
  },
  {
    type: 'input',
    name: 'name',
    message: '大松名稱',
    default: function () {
      return '謝頓危機松';
    }
  },
  {
    type: 'input',
    name: 'begin_at',
    message: '開始時間',
    default: function () {
      return default_begin_date;
    },
    validate: function (value) {
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
    default: function () {
      return default_end_date;
    },
    validate: function (value) {
      var pass = value.match(/(\d{4}\/\d{2}\/\d{2} \d{2}:\d{2})/);
      if (pass) {
        return true;
      }
      return '時間格式錯啦！';
    }
  }
];

inquirer.prompt(questions).then(function (answers) {
  console.log('開始...');
  console.log('--------');
  console.log('建立 KKTIX 活動...');
  console.log('建完活動也發佈啦... URL');
  console.log('--------');
  console.log('建立 hackpad...');
  console.log('建完 hackpad 啦... URL');
  console.log('--------');
  console.log('建立 Google Spreadsheet...');
  console.log('建完 Spreadsheet 啦... URL');
  console.log(JSON.stringify(answers, null, '  '));
});
