var inquirer = require('inquirer');

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
      return '2032/12/27 09:00';
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
      return '2032/12/27 18:00';
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
  console.log('開始...')
  console.log(JSON.stringify(answers, null, '  '));
});
