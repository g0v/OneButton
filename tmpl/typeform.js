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
    "webhook_submit_url": "",
    "title": opts.name + " 會後問券",
    "tags": ["g0v"],
    "fields": [
      {
        "type": "yes_no",
        "question": "第一次參與 g0v 黑客松嗎？",
        "description": "Is this your first time attending g0v hackathon?",
        "required": true
      },
      {
        "type": "multiple_choice",
        "question": "你的專業／背景是？",
        "description": "What's your background?",
        "required": true,
        "allow_multiple_selections": true,
        "add_other_choice": true,
        "choices": opts.professions.map(function(x) { return { label: x } })
      },
      {
        "type": "multiple_choice",
        "question": "這次活動你有...",
        "description": "What did you do today?",
        "required": true,
        "allow_multiple_selections": true,
        "add_other_choice": true,
        "choices": opts.achievements.map(function(x) { return { label: x } })
      },
      {
        "type": "opinion_scale",
        "question": "對這次 hackathon 整體感覺？",
        "description": "How did you feel about today's hackathon?",
        "required": true,
        "steps": 6,
        "labels": {
          "left": "很無聊/bored",
          "right": "超棒der/fantastic"
        }
      },
      {
        "type": "rating",
        "question": "喜歡今天的食物嗎？",
        "description": "Do you like the food?",
        "required": true,
        "steps": 5,
        "shape": "up"
      },
      {
        "type": "opinion_scale",
        "question": "今天小講的整體感受？（可跳過）",
        "description": "How did you feel about the 8-min talks? (optional)",
        "required": false,
        "steps": 6,
        "labels": {
          "left": "很無聊/bored",
          "right": "超棒der/fantastic"
        }
      },
      {
        "type": "short_text",
        "question": "參與的專案是？（可跳過）",
        "description": "Which project(s) did you participate? (optional)",
        "required": false
      },
      {
        "type": "long_text",
        "question": "印象深刻的專案？（可跳過）",
        "description": "Which project(s) impressed you? (optional)",
        "required": false
      },
      {
        "type": "long_text",
        "question": "印象深刻的小講？（可跳過）",
        "description": "Which talk(s) impressed you? (optional)",
        "required": false
      },
      {
        "type": "long_text",
        "question": "大松可以更好的地方？或你下次想協助改進的地方？（可跳過）",
        "description": "How can we improve this event? (optional)",
        "required": false
      },
      {
        "type": "short_text",
        "question": "你的姓名（非必填）",
        "description": "Your name/id (optional)",
        "required": false
      },
      {
        "type": "opinion_scale",
        "question": "下次還想報名參加嗎？",
        "description": "Would you like to participate g0v hackathon next time?",
        "required": true,
        "steps": 6,
        "labels": {
          "left": "不想 No",
          "right": "很期待 Definitely"
        }
      },
      {
        "type": "multiple_choice",
        "question": "可否讓我們引用你的意見？",
        "description": "Can we cite your opinions/comments?",
        "required": true,
        "allow_multiple_selections": false,
        "add_other_choice": false,
        "choices": [{
          "label": "可以，請標示名字 Yes, with my name/id"
        }, {
          "label": "可以，請匿名 Yes, anonymously"
        }, {
          "label": "No"
        }]
      },
      {
        "type": "short_text",
        "question": "若願意幫忙大松活動，可留下聯絡方式～\n（也歡迎加入 g0v slack #jothon 頻道）\n\nLeave your contact information if you'd like to help!",
        "description": "願意認領報到、當大使、新手教學、直播、場務、計時等微型任務，來個 fb or email 吧！",
        "required": false
      }
    ]
  };
};
