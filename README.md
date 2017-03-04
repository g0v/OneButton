# OneButton

OneButton is a one-click solution for ipa to finish all hackathon duties at once. Some features are mentioned in [hackpad]( https://g0v.hackpad.com/%25E7%25AC%25AC%25E5%25A3%25B9%25E6%25AC%25A1%25E5%259F%25BA%25E7%25A4%258E%25E6%259D%25BE#-2016612).

## Prerequisite

* `brew install phantomjs`
* `npm install -g casperjs`
* `npm i`
* Update **config.js**
  * kktix's account, password
  * hackpad's id, secret (each hackpad subdomain has differnet hackpad id, secret)
  * bit.ly's access token

#### Google OAuth

In order to use google drive api, please follow the guide from
[Google Drive APIs](https://developers.google.com/drive/v3/web/quickstart/nodejs#step_1_turn_on_the_api_name) to turn on google drive api and generate a client secret. Once a secret is downloaded, you need to update the path of your GAPI secret and where a token is to stored in config.js. After that, you have generate a token using:

```
$ node js/gapi-gen-token.js
```

## Run

#### See the GUI in development

Run `npm start` and visit `http://localhost:3000/`.

#### Run whole function

Run `node js/input.js` to create event in CUI.

#### Run part of function

You can fork and create event manually now:
*  `casperjs --ignore-ssl-errors=yes --ssl-protocol=tlsv1 --slug="EVENT_SLUG" --name="EVENT_NAME" --start_at="2016/06/24 09:00" --end_at="2016/06/24 18:00" --signup_at="06/10" js/kktix.js`

To create an event spreadsheet manually:
* `node js/spreadsheet.js EVENT_NUMBER EVENT_NAME`

To create an event hackpad manually:
* `node js/hackpad.js EVENT_NUMBER EVENT_NAME EVENT_START_TIME EVENT_END_TIME`

To create an event hackfoldr manually:
* `node js/hackfoldr.js EVENT_NUMBER EVENT_NAME EVENT_START_TIME EVENT_SIGNUP_TIME [SPREADSHEET_LINK]`

To create an event typeform manually:
* `node js/typeform.js EVENT_NAME`

You can customize `tmpl/typeform.js` to add more professions and achievements.

## Contributors

* ipa (https://github.com/ipaaa) & ttcat (https://github.com/ttcat) for feature planning.
* hlb (https://github.com/hlb) for project structure.
* Lee (https://github.com/jessy1092) for hackpad integration.
* caasi (https://github.com/caasi) for hackfolder and typeform integrations.
* Jim (https://github.com/lemonlatte) for google spreadsheet creation
