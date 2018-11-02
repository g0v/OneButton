var defaults = {
  name: '第零次動員戡亂黑客松',
  professions: [
    "Node.js",
    "front-end",
    "programmer",
    "JavaScript",
    "NGO",
    "PHP",
    "designer",
    "Mobile App Engineer",
    "writer/editor",
    "media",
    "gov",
    "PM"
  ],
  achievements: [
    "挖坑 / 發起專案 Start a project",
    "填坑 / 參與專案 Join a project",
    "認識新朋友 Make new friends",
    "吃飽飽 eat eat eat",
    "都沒有 sorry, nothing .....",
    "沒來忘記退票 >_< I didn't show up"
  ]
};

module.exports = function (opts) {
  opts.name = opts.name || defaults.name;
  opts.professions = opts.professions || defaults.professions;
  opts.achievements = opts.achievements || defaults.achievements;

  return {
    "title": opts.name + " 會後問券",
    "fields": [
      {
        "type": "yes_no",
        "title": "第一次參與 g0v 黑客松嗎？",
        "properties": {
          "description": "Is this your first time attending g0v hackathon?"
        },
        "validations": {
          "required": true
        }
      },
      {
        "type": "multiple_choice",
        "title": "你的專業／背景是？",
        "properties": {
          "description": "What's your background?",
          "choices": opts.professions.map(function(x) { return { label: x } }),
    	  "allow_multiple_selection": true,
    	  "allow_other_choice": true
        },
        "validations": {
          "required": true
        }
      },
      {
        "type": "multiple_choice",
        "title": "這次活動你有...",
        "properties": {
          "description": "What did you do today?",
          "choices": opts.achievements.map(function(x) { return { label: x } }),
    	  "allow_multiple_selection": true,
    	  "allow_other_choice": true
        },
        "validations": {
          "required": true
        }
      },
      {
        "type":"opinion_scale",
        "title": "對這次 hackathon 整體感覺？",
        "properties": {
          "description": "How did you feel about today's hackathon?",
          "steps": 6,
          "labels": {
            "left": "很無聊/bored",
            "right": "超棒der/fantastic"
          }
        },
        "validations": {
          "required": true
        }
      },
      {
        "type": "rating",
        "title": "喜歡今天的食物嗎？",
        "properties": {
          "description": "Do you like the food?",
          "steps": 5,
          "shape": "up"
        },
        "validations": {
          "required": true
        }
      },
      {
        "type":"opinion_scale",
        "title": "今天小講的整體感受？（可跳過）",
        "properties": {
          "description": "How did you feel about the 8-min talks? (optional)",
          "steps": 6,
          "labels": {
            "left": "很無聊/bored",
            "right": "超棒der/fantastic"
          }
        },
        "validations": {
          "required": false
        }
      },
      {
        "type": "short_text",
        "title": "參與的專案是？（可跳過）",
        "properties": {
          "description": "Which project(s) did you participate? (optional)"
        },
        "validations": {
          "required": false
        }
      },
      {
        "type": "long_text",
        "title": "印象深刻的小講？（可跳過）",
        "properties": {
          "description": "Which talk(s) impressed you? (optional)"
        },
        "validations": {
          "required": false
        }
      },
      {
        "type": "long_text",
        "title": "大松可以更好的地方？或你下次想協助改進的地方？（可跳過）",
        "properties": {
          "description": "How can we improve this event? (optional)"
        },
        "validations": {
          "required": false
        }
      },
      {
        "type": "short_text",
        "title": "你的姓名（非必填）",
        "properties": {
          "description": "Your name/id (optional)"
        },
        "validations": {
          "required": false
        }
      },
      {
        "type":"opinion_scale",
        "title": "下次還想報名參加嗎？",
        "properties": {
          "description": "Would you like to participate g0v hackathon next time?",
          "steps": 6,
          "labels": {
            "left": "不想 No",
            "right": "很期待 Definitely"
          }
        },
        "validations": {
          "required": true
        }
      },
      {
        "type": "multiple_choice",
        "title": "可否讓我們引用你的意見？",
        "properties": {
          "description": "Can we cite your opinions/comments?",
          "choices": [
            {"label": "可以，請標示名字 Yes, with my name/id"},
            {"label": "可以，請匿名 Yes, anonymously"}, 
            {"label": "No"}
          ],
    	  "allow_multiple_selection": false,
    	  "allow_other_choice": false
        },
        "validations": {
          "required": true
        }
      },
      {
        "type": "short_text",
        "title": "若願意幫忙大松活動，可留下聯絡方式～\n（也歡迎加入 g0v slack #jothon 頻道）\n\nLeave your contact information if you'd like to help!",
        "properties": {
          "description": "願意認領報到、當大使、新手教學、直播、場務、計時等微型任務，來個 fb or email 吧！"
        },
        "validations": {
          "required": false
        }
      }
    ]
  };
};
